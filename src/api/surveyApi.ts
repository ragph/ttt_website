import axiosClient from './axiosClient';
import { API_IMAGE_BASE_URL } from '../utils/constants';

export interface Survey {
  id: number;
  title: string;
  description: string;
  image: string | null;
  category: string;
  status: 'active' | 'inactive';
  startDate: string;
  endDate: string | null;
  totalResponses: number;
  castingToken?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SurveyQuestion {
  id: number;
  surveyId?: number;
  question: string;
  type: 'text' | 'multiple_choice' | 'multiple-choice' | 'rating' | 'checkbox';
  options: any[] | null;
  required: boolean;
  order?: number;
}

export interface SurveyDetail extends Survey {
  questions: SurveyQuestion[];
}

export interface CandidateOption {
  text: string;
  imageUrl?: string;
  imageUrls?: string[];
  description?: string;
}

export interface SurveyResponse {
  surveyId: number;
  responses: {
    questionId: number;
    answer: string | string[];
  }[];
}

class SurveyApiService {
  /**
   * Get all public active surveys
   */
  async getPublicSurveys(): Promise<Survey[]> {
    const result = await this.getPublicSurveysWithCategories();
    return result.surveys;
  }

  /**
   * Get all public active surveys with all categories
   */
  async getPublicSurveysWithCategories(): Promise<{ surveys: Survey[]; categories: string[] }> {
    try {
      const response = await axiosClient.get('/surveys/public') as {
        success: boolean;
        categories: { category: string; surveys: Survey[]; count: number }[];
      };

      // Extract all category names and flatten surveys
      const allCategories: string[] = [];
      const surveys: Survey[] = [];

      if (response.categories) {
        for (const cat of response.categories) {
          allCategories.push(cat.category);
          if (cat.surveys && cat.surveys.length > 0) {
            surveys.push(...cat.surveys);
          }
        }
      }

      // Convert image URLs for all surveys
      const processedSurveys = surveys.map(survey => {
        if (survey.image && !survey.image.startsWith('http')) {
          const imagePath = survey.image.startsWith('/api') ? survey.image.replace('/api', '') : survey.image;
          const finalImageUrl = `${API_IMAGE_BASE_URL}${imagePath}`;
          return { ...survey, image: finalImageUrl };
        }
        return survey;
      });

      return { surveys: processedSurveys, categories: allCategories };
    } catch (error) {
      console.error('Error fetching public surveys:', error);
      return { surveys: [], categories: [] };
    }
  }

  /**
   * Get survey by ID with questions (public endpoint)
   */
  async getSurveyById(id: string | number): Promise<SurveyDetail | null> {
    try {
      const response = await axiosClient.get(`/surveys/public/${id}`) as { survey: SurveyDetail };

      if (!response.survey) {
        return null;
      }

      // Convert relative image paths to absolute URLs
      const survey = response.survey;
      if (survey.image && !survey.image.startsWith('http')) {
        // Remove /api prefix if it exists in the image path
        const imagePath = survey.image.startsWith('/api') ? survey.image.replace('/api', '') : survey.image;
        const finalImageUrl = `${API_IMAGE_BASE_URL}${imagePath}`;
        console.log('🖼️ Image URL Conversion:', {
          original: survey.image,
          imagePath,
          API_IMAGE_BASE_URL,
          final: finalImageUrl
        });
        survey.image = finalImageUrl;
      }

      // Convert question option images to absolute URLs
      if (survey.questions) {
        survey.questions = survey.questions.map((question: SurveyQuestion) => {
          if ((question.type === 'multiple_choice' || question.type === 'multiple-choice') && question.options) {
            const convertedOptions = question.options.map((option: any) => {
              if (typeof option === 'object') {
                const converted = { ...option };

                // Handle single imageUrl
                if (converted.imageUrl && !converted.imageUrl.startsWith('http')) {
                  // Remove /api prefix if it exists
                  const imgPath = converted.imageUrl.startsWith('/api') ? converted.imageUrl.replace('/api', '') : converted.imageUrl;
                  converted.imageUrl = `${API_IMAGE_BASE_URL}${imgPath}`;
                }

                // Handle multiple imageUrls
                if (converted.imageUrls && Array.isArray(converted.imageUrls)) {
                  converted.imageUrls = converted.imageUrls.map((img: string) => {
                    if (img.startsWith('http')) return img;
                    // Remove /api prefix if it exists
                    const imgPath = img.startsWith('/api') ? img.replace('/api', '') : img;
                    return `${API_IMAGE_BASE_URL}${imgPath}`;
                  });
                }

                return converted;
              }
              return option;
            });

            return { ...question, options: convertedOptions };
          }
          return question;
        });
      }

      return survey;
    } catch (error) {
      console.error('Error fetching survey:', error);
      return null;
    }
  }

  /**
   * Submit survey response
   */
  async submitResponse(data: SurveyResponse): Promise<boolean> {
    try {
      await axiosClient.post('/surveys/public/responses', data);
      return true;
    } catch (error) {
      console.error('Error submitting survey response:', error);
      return false;
    }
  }

  /**
   * Get survey results/statistics (casting stats)
   */
  async getSurveyResults(token: string): Promise<any> {
    try {
      const response = await axiosClient.get(`/casting/${token}/stats`);
      return response;
    } catch (error) {
      console.error('Error fetching survey results:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const surveyApi = new SurveyApiService();

// Export the class for testing purposes
export default SurveyApiService;

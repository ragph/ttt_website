import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Polygon,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { RegionData } from "./data/RegionalData";
import { provinceData } from "./data/ProvinceData";
import { mapDataService } from "../../../api/mapDataService";

// Mapping between MapData region names and ProvinceData region names
const regionNameMap: Record<string, string> = {
  "National Capital Region": "Metropolitan Manila",
  "Cordillera Administrative Region": "Cordillera Administrative Region (CAR)",
  "Ilocos Region": "Ilocos Region (Region I)",
  "Cagayan Valley": "Cagayan Valley (Region II)",
  "Central Luzon": "Central Luzon (Region III)",
  Calabarzon: "CALABARZON (Region IV-A)",
  Mimaropa: "MIMAROPA (Region IV-B)",
  "Bicol Region": "Bicol Region (Region V)",
  "Western Visayas": "Western Visayas (Region VI)",
  "Central Visayas": "Central Visayas (Region VII)",
  "Eastern Visayas": "Eastern Visayas (Region VIII)",
  "Zamboanga Peninsula": "Zamboanga Peninsula (Region IX)",
  "Northern Mindanao": "Northern Mindanao (Region X)",
  "Davao Region": "Davao Region (Region XI)",
  Soccsksargen: "SOCCSKSARGEN (Region XII)",
  Caraga: "Caraga (Region XIII)",
  "Bangsamoro (BARMM)": "Autonomous Region of Muslim Mindanao (ARMM)",
};

// Helper to get provinces for a region
const getProvincesForRegion = (regionName: string) => {
  const mappedName = regionNameMap[regionName] || regionName;
  return provinceData.filter((p) => p.region === mappedName);
};
import { SectionHeader } from "../../landing/components/SectionHeader";

// Fix for default marker icons in React-Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom icon for user location
const UserLocationIcon = L.icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#2196F3" width="32" height="32">
      <circle cx="12" cy="12" r="8" fill="#2196F3" opacity="0.3"/>
      <circle cx="12" cy="12" r="5" fill="#2196F3"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Create label icon for province names
const createLabelIcon = (name: string) => {
  return L.divIcon({
    className: "",
    html: `<span style="background:rgba(255,255,255,0.92);padding:2px 6px;border-radius:3px;font-size:10px;font-weight:600;color:#333;white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,0.3);display:inline-block;transform:translate(-50%,-50%)">${name}</span>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map center changes
function MapCenterController({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, 10, {
      duration: 1.5,
    });
  }, [center, map]);

  return null;
}

// Placeholder image for missing images
const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400";

// Image Carousel Component
const ImageCarousel = ({ images, alt }: { images: string[]; alt: string }) => {
  const [activeStep, setActiveStep] = useState(0);

  // Use placeholder if images array is empty or undefined
  const validImages = images && images.length > 0 ? images : [PLACEHOLDER_IMAGE];
  const maxSteps = validImages.length;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        height="200"
        image={validImages[activeStep] || PLACEHOLDER_IMAGE}
        alt={`${alt} - Image ${activeStep + 1}`}
        sx={{ objectFit: "cover" }}
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = PLACEHOLDER_IMAGE;
        }}
      />
      {maxSteps > 1 && (
        <>
          {/* Navigation Buttons */}
          <IconButton
            onClick={handleBack}
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              width: 36,
              height: 36,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                transform: "translateY(-50%) scale(1.05)",
              },
            }}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              width: 36,
              height: 36,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                transform: "translateY(-50%) scale(1.05)",
              },
            }}
          >
            <KeyboardArrowRight />
          </IconButton>

          {/* Pagination Dots */}
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.75,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(4px)",
              borderRadius: "12px",
              padding: "6px 10px",
            }}
          >
            {validImages.map((_, index) => (
              <Box
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStep(index);
                }}
                sx={{
                  width: activeStep === index ? 20 : 6,
                  height: 6,
                  borderRadius: "3px",
                  backgroundColor: "white",
                  opacity: activeStep === index ? 1 : 0.4,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: activeStep === index ? 1 : 0.6,
                  },
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
};

const Map = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    12.8797, 121.774,
  ]); // Center of Philippines
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState<"regions" | "provinces">("regions");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [regionalData, setRegionalData] = useState<RegionData[]>([]);

  // Toggle fullscreen mode
  const toggleFullscreen = useCallback(() => {
    if (!mapContainerRef.current) return;

    if (!document.fullscreenElement) {
      mapContainerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
        })
        .catch((err) => {
          console.error("Error enabling fullscreen:", err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
        })
        .catch((err) => {
          console.error("Error exiting fullscreen:", err);
        });
    }
  }, []);

  // Listen for fullscreen changes (e.g., pressing Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Load regional data from API on component mount
  useEffect(() => {
    const loadRegionalData = async () => {
      // Clear cache to ensure fresh data
      mapDataService.clearCache();
      const data = await mapDataService.getRegionalData();
      setRegionalData(data);
    };
    loadRegionalData();
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Get user's current location on component mount
  useEffect(() => {
    setIsLoading(true);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userCoords: [number, number] = [latitude, longitude];
          setUserLocation(userCoords);
          setMapCenter(userCoords);
          // Delay to ensure map renders properly
          setTimeout(() => setIsLoading(false), 800);
        },
        (error) => {
          console.log("Geolocation error:", error.message);
          // Fallback to Philippines center if geolocation fails
          setMapCenter([12.8797, 121.774]);
          setTimeout(() => setIsLoading(false), 800);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      setMapCenter([12.8797, 121.774]);
      setTimeout(() => setIsLoading(false), 800);
    }
  }, []);

  const handleRegionClick = (region: RegionData, province?: string) => {
    console.log('Selected Province:', province);
    console.log('Tourist Spots:', region.touristSpots.map(s => ({ name: s.name, province: s.province })));
    setSelectedRegion(region);
    setSelectedProvince(province || null);
    setMapCenter([region.lat, region.lng]);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProvince(null); // Reset selected province when closing dialog
  };

  // Show loading state
  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress size={60} thickness={4} />
          <Typography
            variant="h6"
            sx={{ mt: 3, color: "text.secondary", fontWeight: 500 }}
          >
            Loading Map...
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            Please wait while we prepare your experience
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 2, pb: 6 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <SectionHeader
          badge="EXPLORE THE PHILIPPINES"
          title="Discover Amazing Destinations"
          subtitle="Click on any region to explore popular tourist spots and plan your next adventure"
          align="center"
          containerSx={{ mb: 4 }}
        />

        <Grid container spacing={6} alignItems="flex-start">
          {/* Interactive Leaflet Map */}
          <Grid size={{ xs: 12, lg: 12 }}>
              <Paper
                ref={mapContainerRef}
                elevation={3}
                sx={{
                  height: isFullscreen ? "100vh" : { xs: 500, lg: 700 },
                  borderRadius: isFullscreen ? 0 : 2,
                  overflow: "hidden",
                  position: "relative",
                  "& .leaflet-container": {
                    height: "100%",
                    width: "100%",
                    borderRadius: "inherit",
                  },
                }}
              >
                {/* Fullscreen Toggle Button */}
                <IconButton
                  onClick={toggleFullscreen}
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1000,
                    bgcolor: "white",
                    boxShadow: 2,
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                  }}
                  size="small"
                >
                  {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>

                <MapContainer
                  center={mapCenter}
                  zoom={6}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapCenterController center={mapCenter} />

                  {/* Region Boundaries - shown when viewing regions OR for non-selected regions */}
                  {regionalData.map((region) => {
                    const isSelected =
                      selectedRegion?.id === region.id &&
                      viewMode === "provinces";

                    // Don't render region polygon if it's selected (we'll show provinces instead)
                    if (isSelected) return null;

                    // Handle both single polygon and MultiPolygon
                    const positions = region.isMultiPolygon
                      ? (region.boundaries as [number, number][][])
                      : (region.boundaries as [number, number][]);

                    return (
                      <Polygon
                        key={`region-${region.id}`}
                        positions={positions}
                        pathOptions={{
                          color: "#333",
                          fillColor: region.color,
                          fillOpacity: viewMode === "provinces" ? 0.3 : 0.5,
                          weight: 2,
                        }}
                        eventHandlers={{
                          click: () => {
                            setSelectedRegion(region);
                            setViewMode("provinces");
                            setMapCenter([region.lat, region.lng]);
                          },
                        }}
                      />
                    );
                  })}

                  {/* Region Labels - shown when viewing regions */}
                  {viewMode === "regions" &&
                    regionalData.map((region) => (
                      <Marker
                        key={`region-label-${region.id}`}
                        position={[region.lat, region.lng]}
                        icon={createLabelIcon(
                          region.shortName || region.region
                        )}
                        interactive={false}
                      />
                    ))}

                  {/* Province Boundaries - only shown for selected region */}
                  {viewMode === "provinces" &&
                    selectedRegion &&
                    getProvincesForRegion(selectedRegion.region).map(
                      (province) => {
                        const positions = province.isMultiPolygon
                          ? (province.boundaries as [number, number][][])
                          : (province.boundaries as [number, number][]);

                        return (
                          <Polygon
                            key={`province-${province.id}`}
                            positions={positions}
                            pathOptions={{
                              color: "#444",
                              fillColor: province.color,
                              fillOpacity: 0.6,
                              weight: 1.5,
                            }}
                            eventHandlers={{
                              click: () => {
                                setMapCenter([province.lat, province.lng]);
                                handleRegionClick(selectedRegion, province.province);
                              },
                            }}
                          />
                        );
                      }
                    )}

                  {/* Province Labels - only shown for selected region */}
                  {viewMode === "provinces" &&
                    selectedRegion &&
                    getProvincesForRegion(selectedRegion.region).map(
                      (province) => (
                        <Marker
                          key={`province-label-${province.id}`}
                          position={[province.lat, province.lng]}
                          icon={createLabelIcon(province.province)}
                          interactive={false}
                        />
                      )
                    )}

                  {/* User Location Marker */}
                  {userLocation && (
                    <Marker position={userLocation} icon={UserLocationIcon}>
                      <Popup>
                        <Box sx={{ minWidth: 150 }}>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, mb: 0.5 }}
                          >
                            Your Location
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                          >
                            Current position
                          </Typography>
                        </Box>
                      </Popup>
                    </Marker>
                  )}
                </MapContainer>
              </Paper>
          </Grid>

          {/* Regions & Provinces Combined Section */}
          <Grid size={{ xs: 12, lg: 12 }}>
              <Box>
                {/* Header with back button when viewing provinces */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  {viewMode === "provinces" && selectedRegion && (
                    <IconButton
                      onClick={() => {
                        setViewMode("regions");
                        setSelectedRegion(null);
                      }}
                      sx={{
                        bgcolor: "action.hover",
                        "&:hover": { bgcolor: "action.selected" },
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  )}
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                      }}
                    >
                      {viewMode === "regions"
                        ? "Philippine Regions"
                        : selectedRegion?.region}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {viewMode === "regions"
                        ? "17 regions across the archipelago"
                        : `${
                            getProvincesForRegion(selectedRegion?.region || "")
                              .length
                          } provinces in this region`}
                    </Typography>
                  </Box>
                </Box>

                {/* Regions Grid */}
                {viewMode === "regions" && (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        md: "repeat(4, 1fr)",
                        lg: "repeat(4, 1fr)",
                      },
                      gap: 2,
                    }}
                  >
                    {regionalData.map((region) => {
                      const provincesInRegion = getProvincesForRegion(
                        region.region
                      );
                      return (
                        <Paper
                          key={region.id}
                          elevation={2}
                          onClick={() => {
                            setSelectedRegion(region);
                            setViewMode("provinces");
                            setMapCenter([region.lat, region.lng]);
                          }}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-4px)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                width: 18,
                                height: 18,
                                bgcolor: region.color,
                                borderRadius: 1,
                                flexShrink: 0,
                                mt: 0.3,
                                border: "1px solid rgba(0,0,0,0.1)",
                              }}
                            />
                            <Box>
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  fontWeight: 600,
                                  fontSize: "0.95rem",
                                  lineHeight: 1.3,
                                }}
                              >
                                {region.region}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  display: "block",
                                  mt: 0.5,
                                }}
                              >
                                {provincesInRegion.length} provinces ·{" "}
                                {region.touristSpots.length} tourist spots
                              </Typography>
                            </Box>
                          </Box>
                        </Paper>
                      );
                    })}
                  </Box>
                )}

                {/* Provinces Grid (filtered by selected region) */}
                {viewMode === "provinces" && selectedRegion && (
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(2, 1fr)",
                        sm: "repeat(3, 1fr)",
                        md: "repeat(4, 1fr)",
                        lg: "repeat(4, 1fr)",
                      },
                      gap: 2,
                    }}
                  >
                    {getProvincesForRegion(selectedRegion.region).map(
                      (province) => (
                        <Paper
                          key={province.id}
                          elevation={2}
                          onClick={() => {
                            setMapCenter([province.lat, province.lng]);
                            handleRegionClick(selectedRegion);
                          }}
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "translateY(-4px)",
                            },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.5,
                            }}
                          >
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                bgcolor: province.color,
                                borderRadius: "50%",
                                flexShrink: 0,
                                border: "1px solid rgba(0,0,0,0.1)",
                              }}
                            />
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600 }}
                            >
                              {province.province}
                            </Typography>
                          </Box>
                        </Paper>
                      )
                    )}
                  </Box>
                )}
              </Box>
          </Grid>
        </Grid>

        {/* Tourist Spots Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="lg"
          fullWidth
          scroll="paper"
        >
          {selectedRegion && (
            <>
              <DialogTitle
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOnIcon
                    sx={{ color: "primary.main", fontSize: 28 }}
                  />
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {selectedRegion.region}
                    </Typography>
                  </Box>
                </Box>
                <IconButton onClick={handleCloseDialog}>
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent
                dividers
                sx={{
                  px: 3,
                  py: 3,
                  maxHeight: "70vh",
                  overflow: "auto",
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  {selectedProvince
                    ? `Tourist Spots in ${selectedProvince}`
                    : "Popular Tourist Spots"}
                </Typography>
                <Grid container spacing={2}>
                  {(() => {
                    const filteredSpots = selectedRegion.touristSpots.filter((spot) => {
                      if (!selectedProvince) return true;
                      const matches = spot.province.toLowerCase() === selectedProvince.toLowerCase();
                      console.log(`Comparing: "${spot.province.toLowerCase()}" === "${selectedProvince.toLowerCase()}" = ${matches}`);
                      return matches;
                    });
                    console.log(`Filtered ${filteredSpots.length} spots out of ${selectedRegion.touristSpots.length}`);

                    if (filteredSpots.length === 0) {
                      return (
                        <Grid size={{ xs: 12 }}>
                          <Typography
                            variant="body1"
                            sx={{
                              textAlign: "center",
                              color: "text.secondary",
                              py: 4,
                            }}
                          >
                            No tourist spots found for {selectedProvince}
                          </Typography>
                        </Grid>
                      );
                    }

                    return filteredSpots.map((spot, index) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                      <Card
                        sx={{
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: 6,
                          },
                        }}
                        onClick={() => {
                          handleCloseDialog();
                          navigate(
                            `/details/${encodeURIComponent(selectedRegion.region)}/${encodeURIComponent(spot.province)}/${encodeURIComponent(spot.name)}`
                          );
                        }}
                      >
                        <ImageCarousel images={spot.images} alt={spot.name} />
                        <CardContent sx={{ flexGrow: 1, p: 2 }}>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            {spot.name}
                          </Typography>
                          <Chip
                            label={spot.province}
                            size="small"
                            variant="outlined"
                            sx={{
                              mb: 1.5,
                              fontSize: "0.75rem",
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{
                              color: "text.secondary",
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {spot.description.replace(/<[^>]*>/g, '')}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ));
                  })()}
                </Grid>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Container>
    </Box>
  );
};

export default Map;

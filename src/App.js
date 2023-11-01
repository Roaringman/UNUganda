import "./App.css"
import DistrictOverview from "./Components/DistrictOverview"
import React, { useEffect, useState } from "react"
import { populationDistrict } from "./Data/populationData_districts"
import { sectorThreat_agriculture_district } from "./Data/sectorThreat_agriculture_district"
import UgandaMap from "./Components/UgandaMap"

import {
  Container,
  Grid,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Typography,
  Button,
  TextField,
  IconButton,
  List,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import MuiDrawer from "@mui/material/Drawer"

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowDimensions
}

const UnToggleBtn = styled(ToggleButton)(({ selectedcolor }) => ({
  color: "#A7A7A7",
  border: "none",
  borderRadius: "0 !important",
  borderBottom: "2px solid",
  borderBottomColor: selectedcolor ? selectedcolor : "#A7A7A7",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: selectedcolor ? selectedcolor : "#A7A7A7",
  },
}))

const BtnAccordion = styled(Accordion)(() => ({
  border: `1px solid #C1C1C1`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "0px 0px",
  },
}))

const UnButton = styled(Button)(() => ({
  border: `1px solid #C1C1C1`,
  borderRadius: 0,
  padding: "12px 16px",
  borderBottom: "none",
  justifyContent: "flex-start",
  color: "#000000DE",
  "&:hover": {
    border: `1px solid #C1C1C1`,
    borderBottom: "none",
  },
  "&:last-child": {
    borderBottom: `1px solid #C1C1C1`,
  },
}))

function App() {
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedThreat, setSelectedThreat] = useState("drought")

  const { height, width } = useWindowDimensions()

  const hazardArray = [
    { name: "drought", color: "#E09C4C" },
    { name: "heatwave", color: "#C33030" },
    { name: "flood", color: "#387EE6" },
    { name: "landslide", color: "#836436" },
  ]
  const [hazard, setHazard] = useState("drought")
  const handleHazardChange = (event, newHazard) => {
    setHazard(newHazard)
  }

  const cropsArray = [
    "Banana",
    "Beans",
    "Cassava",
    "Coffee",
    "Cotton",
    "Maize",
    "Millet",
    "Potatoes",
    "Sorghum",
    "Sugar Cane",
    "Tea",
    "Rice",
  ]
  const handleCropsChange = (event, newCrops) => {
    setSector(newCrops)
  }

  const timeArray = ["2025", "2030", "2050"]
  const [time, setTime] = useState("2025")
  const handleTimeChange = (event, newTime) => {
    setTime(newTime)
  }

  const [population, setPopulation] = useState("hide")
  const handlePopulationChange = (event, newPopulation) => {
    setPopulation(newPopulation)
  }

  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const [sector, setSector] = useState(null)

  const handleSetSector = (btnName) => {
    console.log("btnName", btnName)
    if (btnName === sector) {
      setSector(null)
    } else setSector(btnName)
  }

  // Just drawer things
  const [drawerOpen, setDrawerOpen] = useState(true)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const drawerWidth = "100%"

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: (width / 12) * 2,
        [theme.breakpoints.up("sm")]: {
          width: (width / 12) * 2,
        },
      }),
    },
  }))

  useEffect(() => {
    if (selectedDistrict !== "") {
      setDrawerOpen(false)
    } else setDrawerOpen(true)
  }, [selectedDistrict])

  return (
    <Box>
      <Container maxWidth="100vw" sx={{ height: height }} disableGutters>
        <Grid container sx={{ height: height }}>
          {/* B U T T O N S */}
          <Grid
            item
            xs={drawerOpen ? 3.5 : 1.5}
            sx={{ height: height, overflowX: "hidden", overflowY: "scroll" }}
            onClick={() => (!drawerOpen ? setDrawerOpen(true) : null)}
          >
            <Drawer variant="permanent" open={drawerOpen}>
              <Stack spacing={2} mt={4} mb={4} pr={0}>
                <Grid container spacing={0}>
                  {/*<IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                  </IconButton>*/}
                </Grid>

                {/* HAZARD */}
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={drawerOpen ? 3 : 12}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: drawerOpen ? "flex-end" : "flex-start",
                      paddingLeft: drawerOpen ? 0 : 2,
                    }}
                  >
                    <Typography variant="body1" pt={2}>
                      HAZARD
                    </Typography>
                  </Grid>
                  <Grid item xs={drawerOpen ? 9 : 6} sx={{ pl: 2 }}>
                    <ToggleButtonGroup
                      color="primary"
                      value={hazard}
                      exclusive
                      onChange={handleHazardChange}
                      sx={{ flexWrap: "wrap" }}
                    >
                      {drawerOpen
                        ? hazardArray.map((threat) => (
                            <UnToggleBtn
                              onClick={() => setSelectedThreat(threat.name)}
                              value={threat.name}
                              sx={{ mr: 1 }}
                              selectedcolor={threat.color}
                            >
                              {threat.name}
                            </UnToggleBtn>
                          ))
                        : hazardArray.map((threat) =>
                            threat.name === selectedThreat ? (
                              <UnToggleBtn
                                onClick={() => setSelectedThreat(threat.name)}
                                value={threat.name}
                                sx={{ mr: 1 }}
                                selectedcolor={threat.color}
                              >
                                Drought
                              </UnToggleBtn>
                            ) : null
                          )}
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>

                {/* TIME */}
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={drawerOpen ? 3 : 12}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: drawerOpen ? "flex-end" : "flex-start",
                      paddingLeft: drawerOpen ? 0 : 2,
                    }}
                  >
                    <Typography variant="body1" pt={2}>
                      TIME
                    </Typography>
                  </Grid>
                  <Grid item xs={drawerOpen ? 9 : 6} sx={{ pl: 2 }}>
                    <ToggleButtonGroup
                      color="primary"
                      value={time}
                      exclusive
                      onChange={handleTimeChange}
                    >
                      {drawerOpen ? (
                        timeArray.map((time) => (
                          <UnToggleBtn
                            value={time}
                            key={time}
                            sx={{ mr: 2, mb: 2 }}
                          >
                            {time}
                          </UnToggleBtn>
                        ))
                      ) : (
                        <UnToggleBtn
                          value={time}
                          key={time}
                          sx={{ mr: 2, mb: 2 }}
                        >
                          {time}
                        </UnToggleBtn>
                      )}
                    </ToggleButtonGroup>
                  </Grid>
                </Grid>

                {/* SECTOR */}
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={drawerOpen ? 3 : 12}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: drawerOpen ? "flex-end" : "flex-start",
                      paddingLeft: drawerOpen ? 0 : 2,
                    }}
                  >
                    <Typography variant="body1" pt={2}>
                      SECTOR
                    </Typography>
                  </Grid>

                  {drawerOpen ? (
                    <Grid item xs={8} sx={{ pl: 2 }}>
                      <BtnAccordion
                        variant="outlined"
                        square
                        expanded={expanded === "health"}
                        onChange={handleChange("health")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="healthbh-content"
                          id="healthbh-header"
                        >
                          <Typography sx={{ textTransform: "Uppercase" }}>
                            Health
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {/* something something */}
                        </AccordionDetails>
                      </BtnAccordion>

                      <BtnAccordion
                        variant="outlined"
                        square
                        expanded={expanded === "crops"}
                        onChange={handleChange("crops")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="cropsbh-content"
                          id="cropsbh-header"
                        >
                          <Typography sx={{ textTransform: "Uppercase" }}>
                            crops
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <ToggleButtonGroup
                            color="primary"
                            value={sector}
                            exclusive
                            onChange={handleCropsChange}
                            sx={{
                              flexWrap: "wrap",
                              justifyContent: "center",
                            }}
                          >
                            {cropsArray.map((crop) => (
                              <UnToggleBtn
                                value={crop}
                                key={crop}
                                sx={{ mr: 2, mb: 2 }}
                                onClick={() => handleSetSector(crop)}
                              >
                                {crop}
                              </UnToggleBtn>
                            ))}
                          </ToggleButtonGroup>
                        </AccordionDetails>
                      </BtnAccordion>

                      <UnButton
                        variant="outlined"
                        fullWidth
                        size="large"
                        className={sector === "forestry" ? "activeBtn" : ""}
                        onClick={() => handleSetSector("forestry")}
                      >
                        <Typography sx={{ textTransform: "Uppercase" }}>
                          forestry
                        </Typography>
                      </UnButton>

                      <UnButton
                        variant="outlined"
                        fullWidth
                        size="large"
                        className={sector === "Aquaculture" ? "activeBtn" : ""}
                        onClick={() => handleSetSector("Aquaculture")}
                      >
                        <Typography sx={{ textTransform: "Uppercase" }}>
                          Aquaculture
                        </Typography>
                      </UnButton>

                      <BtnAccordion
                        variant="outlined"
                        square
                        expanded={expanded === "water"}
                        onChange={handleChange("water")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="waterbh-content"
                          id="waterbh-header"
                        >
                          <Typography sx={{ textTransform: "Uppercase" }}>
                            water
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {/* something something */}
                        </AccordionDetails>
                      </BtnAccordion>

                      <BtnAccordion
                        variant="outlined"
                        square
                        expanded={expanded === "Biodiversity"}
                        onChange={handleChange("Biodiversity")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="Biodiversitybh-content"
                          id="Biodiversitybh-header"
                        >
                          <Typography sx={{ textTransform: "Uppercase" }}>
                            Biodiversity
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {/* something something */}
                        </AccordionDetails>
                      </BtnAccordion>

                      <BtnAccordion
                        variant="outlined"
                        square
                        expanded={expanded === "Mineral_energy"}
                        onChange={handleChange("Mineral_energy")}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="Mineral_energybh-content"
                          id="Mineral_energybh-header"
                        >
                          <Typography sx={{ textTransform: "Uppercase" }}>
                            Mineral development & energy
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {/* something something */}
                        </AccordionDetails>
                      </BtnAccordion>
                    </Grid>
                  ) : (
                    <Grid item xs={6} sx={{ pl: 2 }}>
                      <UnButton
                        variant="outlined"
                        fullWidth
                        size="large"
                        className={"activeBtn"}
                      >
                        <Typography sx={{ textTransform: "Uppercase" }}>
                          {sector !== "" ? sector : "Not Set"}
                        </Typography>
                      </UnButton>
                    </Grid>
                  )}
                </Grid>

                {/* POPULATION */}
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={drawerOpen ? 3 : 12}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: drawerOpen ? "flex-end" : "flex-start",
                      paddingLeft: drawerOpen ? 0 : 2,
                    }}
                  >
                    <Typography variant="body1" pt={2}>
                      POPULATION
                    </Typography>
                  </Grid>
                  {drawerOpen ? (
                    <Grid item xs={9} sx={{ pl: 2 }}>
                      <ToggleButtonGroup
                        color="primary"
                        value={population}
                        exclusive
                        onChange={handlePopulationChange}
                      >
                        <UnToggleBtn value="show" sx={{ mr: 2 }}>
                          show
                        </UnToggleBtn>
                        <UnToggleBtn value="hide" sx={{ mr: 2 }}>
                          hide
                        </UnToggleBtn>
                      </ToggleButtonGroup>
                    </Grid>
                  ) : (
                    <Grid item xs={6} sx={{ pl: 2 }}>
                      <UnToggleBtn
                        value={population}
                        sx={{ mr: 2 }}
                        className={"activeBtn"}
                      >
                        {population}
                      </UnToggleBtn>
                    </Grid>
                  )}
                </Grid>

                {/* SEARCH 
                <Grid container spacing={0}>
                  {drawerOpen ? (
                    <Grid
                      item
                      xs={3}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Typography variant="body1" pt={2}>
                        SEARCH
                      </Typography>
                    </Grid>
                  ) : null}

                  <Grid item xs={drawerOpen ? 8 : 12} sx={{ pl: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                      <TextField
                        id="input-with-sx"
                        label="Find a district"
                        variant="standard"
                        fullWidth
                      />
                      <SearchIcon
                        sx={{ color: "action.active", mr: 1, my: 0.5 }}
                      />
                    </Box>
                  </Grid>
                </Grid>
                */}

                {/* RESET
                <Grid container spacing={0}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <UnToggleBtn value="reset all" sx={{ mr: 2 }}>
                      reset all
                    </UnToggleBtn>
                  </Grid>
                </Grid>
                 */}
              </Stack>
            </Drawer>
          </Grid>

          {/* M A P */}
          <Grid item xs={drawerOpen ? 8.5 : 5} sx={{ height: height }}>
            <UgandaMap
              hazardArray={hazardArray}
              populationDistrict={populationDistrict}
              population={population}
              sectorThreat={sectorThreat_agriculture_district}
              sector={sector}
              time={time}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              selectedThreat={selectedThreat}
            ></UgandaMap>
          </Grid>

          {/* S E A R C H */}
          <Grid
            item
            xs={drawerOpen ? 0 : 5.5}
            sx={{ overflow: "auto", height: height }}
          >
            {selectedDistrict.length > 0 && (
              <DistrictOverview
                selectedThreat={selectedThreat}
                districtName={selectedDistrict}
                population={populationDistrict}
                sectorThreat={sectorThreat_agriculture_district}
              ></DistrictOverview>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default App

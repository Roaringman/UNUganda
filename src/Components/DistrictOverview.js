import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Polygon,
  Tooltip,
} from "react-leaflet";
import React, { useState, useEffect, useMemo } from "react";
import { useMap, useMapEvent } from "react-leaflet/hooks";

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
  Divider,
} from "@mui/material";

function DistrictOverview(props) {
  const districtData = props.population.filter(
    (districtData) => districtData.District.toUpperCase() === props.districtName
  );
  return (
    <Stack spacing={2} m={4}>
      <Grid container spacing={0}>
        <Grid item xs={12} mb={2}>
          <Typography variant="h3">
            {props.districtName} {props.selectedThreat}
          </Typography>
        </Grid>

        <Grid item xs={6} sx={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <Stack spacing={3} px={2}>
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              Risks at a glance
            </Typography>
            <img width="100%" src={require("../img/triangle.png")} />

            <Box>
              <Typography variant="h6">Hazard</Typography>
              <Typography variant="body2">Probability of drought</Typography>
            </Box>

            <Box>
              <Typography variant="h6">Exposure</Typography>
              <Typography variant="body2">
                Human population density in hazard area
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6">Vulnerability</Typography>
              <Typography variant="body2">
                Combination of 5 vulnerability indicators
              </Typography>
            </Box>

            <Divider variant="middle" />

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box>
                  <Typography variant="h6">Sectors at Risk</Typography>
                  <Typography variant="caption">
                    Understanding projected climate change impacts and assessing
                    vulnerabilities across different sectors. Use this chart to
                    identify the most vulnerable sectors and inform the
                    development of targeted climate actions to mitigate and
                    manage the risks whilst building resilience.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} p={2}>
                <img width="100%" src={require("../img/sector_overview.png")} />
              </Grid>
            </Grid>
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack spacing={3} px={2}>
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              Vulnerability Indicators
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="button">Poverty</Typography>
                <Typography variant="body2">
                  Population under poverty line
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="overline">SCORE</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="button">14%</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="button">Education</Typography>
                <Typography variant="body2">
                  Access to basic education
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="overline">SCORE</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="button">3%</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="button">Food</Typography>
                <Typography variant="body2">Food security levels</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="overline">SCORE</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="button">44%</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="button">Health</Typography>
                <Typography variant="body2">
                  Access to health facilities
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="overline">SCORE</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="button">54%</Typography>
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography variant="button">Vulnerable Population</Typography>
                <Typography variant="body2">
                  Population considered vulnerable
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="overline">SCORE</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="button">54%</Typography>
              </Grid>
            </Grid>

            <Divider variant="middle" />

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box>
                  <Typography variant="h6">Monthly Rainfall</Typography>
                  <Typography variant="caption">
                    Average annual rainfall ranges from 1,000 mm to 1,500 mm in
                    two seasons (March to May and September to December).
                    Rainfall in the form of heavy precipitation during the wet
                    seasons has escalated the risk of floods and landslides.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} p={2}>
                <img width="100%" src={require("../img/rainfall.png")} />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>

      <Grid container spacing={1} px={4}>
        <Grid item xs={12}>
          <Typography variant="h6">Adaptation Solutions</Typography>
          <Typography variant="caption">
            Investment in and planning of climate adaptation is needed at
            multiple levels of governance. Interventions range from agricultural
            management practices at the farm level, to climate services or
            market interventions at subnational levels, to programme and policy
            initiatives at the national level. Each of these interventions are
            also time sensitive (short-, medium- and long-term). The benefit of
            generating risk maps is that multiple hazards and sectors can be
            layered in order to inform this prioritisation. Risk maps can also
            inform users where two or more adaptation interventions will act
            synergistically in the same spatially explicit area and complement
            each other even if they are conducted at different levels (e.g.
            climate services and fertilizer application) or whether adaptation
            practices should be conducted independently based on localized
            context (e.g. fish ponds in low-lying areas and contour planting on
            slopes).
            <br />
            <br />
            Effective adaptation at a national scale requires an enabling
            environment to catalyse sustainable and positive behavioural
            changes. Such an enabling environment is determined by governance
            and the policy frameworks in place. By governance, we refer to the
            set of processes, rules, and institutions involved in
            decision-making and the resource allocation at all levels, from the
            community level to the national level, as well as the mechanisms for
            investment and action. ‘Good governance’ often features
            participation, transparency and accountability (Dinesh, 2016). The
            adaptation measures outlined in this section will only be effective
            if an adequate enabling environment is in place.
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
  /*
    return (
        <>
            <section id="district-info-container">

                <article id="district-info">
                    <div class="district-info-row">
                        <h1 id="district-info-titel">
                            {
                                `${props.districtName} ${props.selectedThreat}`
                            }
                        </h1>
                    </div>
                    <div class="district-info-row">
                        <div class="district-info-block">
                            <h2>
                                Risks at a glance
                            </h2>

                            {districtData[0] &&
                                <p>
                                    Mean Permanent Floor: {districtData[0].MEAN_Permanent_floor} etc.
                                </p>
                            }

                        </div>
                        <div class="district-info-block">
                            <h2>
                                Key Indicators
                            </h2>
                        </div>
                    </div>

                    <div class="district-info-row">
                        <div class="district-info-block">
                            <h3>
                                Sectors at Risk
                            </h3>
                        </div>
                        <div class="district-info-block">
                            <h3>
                                Monthly Rainfall
                            </h3>
                        </div>
                    </div>

                    <div class="district-info-row">

                        <div class="district-info-block">

                            <h3>Adaption Solutions</h3>

                            <p>Spatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as populationserved (power plants and substations), passenger trips Spatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population

                                served (power plants and substations), passenger tripsSpatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population served (power plants and substations), passenger tripsSpatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population served (power plants and substations), passenger tripsSpatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population served (power plants and substations), passenger tripsSpatial data on services in Ghana is limited but depending on the nature of the asset and available data, exposure was prioritised by people-focused indicators such as population served (power plants and substations), passenger trips</p>
                        </div>
                    </div>
                </article>


                {

                }
            </section>

        </>
    )
    */
}

export default DistrictOverview;

import React, { useState, useEffect } from 'react';
import HRDiagram from './HRDiagram';

const MTEL_QUIZ = [
  // --- UNIVERSE (1-50) ---
  { q: "What is the primary evidence for the Big Bang?", a: "Redshift and Cosmic Microwave Background Radiation (CMBR).", domain: "Universe" },
  { q: "What does 'Redshift' tell us about galaxies?", a: "They are moving away from us, proving the universe is expanding.", domain: "Universe" },
  { q: "How old is the universe?", a: "Approximately 13.8 billion years.", domain: "Universe" },
  { q: "Which elements were formed first?", a: "Hydrogen and Helium.", domain: "Universe" },
  { q: "Where do stars spend 90% of their lives?", a: "On the Main Sequence of the H-R Diagram.", domain: "Universe" },
  { q: "What process powers a star?", a: "Nuclear fusion (Hydrogen to Helium).", domain: "Universe" },
  { q: "What determines a star's life cycle?", a: "Its initial mass.", domain: "Universe" },
  { q: "What is the fate of a low-mass star (like our Sun)?", a: "Red Giant -> White Dwarf.", domain: "Universe" },
  { q: "What is the fate of a high-mass star?", a: "Supernova -> Neutron Star or Black Hole.", domain: "Universe" },
  { q: "How are elements heavier than Iron formed?", a: "During Supernova explosions.", domain: "Universe" },
  { q: "Where is the Asteroid Belt located?", a: "Between Mars and Jupiter.", domain: "Universe" },
  { q: "What causes the Earth's seasons?", a: "The 23.5° tilt of Earth's axis and its revolution around the Sun.", domain: "Universe" },
  { q: "What is a Spring Tide?", a: "Highest high tides; occurs when Sun, Moon, and Earth align (New/Full Moon).", domain: "Universe" },
  { q: "What is a Neap Tide?", a: "Lower high tides; occurs when Moon and Sun are at right angles (Quarter Moons).", domain: "Universe" },
  { q: "Kepler's 1st Law states orbits are what shape?", a: "Ellipses.", domain: "Universe" },
  { q: "Kepler's 2nd Law says planets move faster when...", a: "...they are closer to the Sun (Perihelion).", domain: "Universe" },
  { q: "Kepler's 3rd Law relates what two variables?", a: "Orbital period (P) and distance from the Sun (a).", domain: "Universe" },
  { q: "Define the Chandrasekhar Limit.", a: "The maximum mass (~1.4 solar masses) for a White Dwarf.", domain: "Universe" },
  { q: "What is Gravitational Lensing?", a: "Massive objects bending light from distant stars, proving relativity.", domain: "Universe" },
  { q: "What is Stellar Nucleosynthesis?", a: "Fusion process in stars creating heavier elements.", domain: "Universe" },
  { q: "What is a Pulsar?", a: "A highly magnetized, rotating neutron star emitting beams of radiation.", domain: "Universe" },
  { q: "Define Parallax.", a: "Apparent shift of a star against the background used to measure distance.", domain: "Universe" },
  { q: "What is the Oort Cloud?", a: "A spherical shell of icy objects at the edge of the solar system.", domain: "Universe" },
  { q: "What is the Kuiper Belt?", a: "Region beyond Neptune containing dwarf planets and comets.", domain: "Universe" },
  { q: "Difference between Apparent and Absolute Magnitude?", a: "Apparent is brightness from Earth; Absolute is true brightness at 10 parsecs.", domain: "Universe" },
  { q: "What is a Quasar?", a: "Highly luminous active galactic nucleus powered by a supermassive black hole.", domain: "Universe" },
  { q: "What is the Schwarzschild Radius?", a: "The radius defining the event horizon of a black hole.", domain: "Universe" },
  { q: "What color are the hottest stars?", a: "Blue.", domain: "Universe" },
  { q: "What color are the coolest stars?", a: "Red.", domain: "Universe" },
  { q: "What is an AU (Astronomical Unit)?", a: "Average distance from Earth to the Sun (~93 million miles).", domain: "Universe" },
  { q: "What is a light-year?", a: "Distance light travels in one year (~6 trillion miles).", domain: "Universe" },
  { q: "What is the 'Local Group'?", a: "The galaxy group that includes the Milky Way and Andromeda.", domain: "Universe" },
  { q: "What is a Solar Flare?", a: "A sudden eruption of radiation on the Sun's surface.", domain: "Universe" },
  { q: "What is the Sun's Photosphere?", a: "The visible 'surface' layer of the Sun.", domain: "Universe" },
  { q: "What is the Sun's Corona?", a: "The outermost layer of the Sun's atmosphere, visible during eclipses.", domain: "Universe" },
  { q: "What are Sunspots?", a: "Cooler, darker regions on the Sun caused by magnetic activity.", domain: "Universe" },
  { q: "Define a Nebula.", a: "A vast cloud of gas and dust where stars are born.", domain: "Universe" },
  { q: "What is dark matter?", a: "Unseen matter that exerts gravitational pull on galaxies.", domain: "Universe" },
  { q: "What is dark energy?", a: "A force causing the expansion of the universe to accelerate.", domain: "Universe" },
  { q: "What is the H-R Diagram's Y-axis?", a: "Luminosity or Absolute Magnitude.", domain: "Universe" },
  { q: "What is the H-R Diagram's X-axis?", a: "Temperature or Spectral Class (OBAFGKM).", domain: "Universe" },
  { q: "Where is the Sun on the H-R diagram?", a: "Main Sequence (Yellow, Class G).", domain: "Universe" },
  { q: "What happens during a Solar Eclipse?", a: "The Moon passes between the Earth and the Sun.", domain: "Universe" },
  { q: "What happens during a Lunar Eclipse?", a: "The Earth passes between the Sun and the Moon.", domain: "Universe" },
  { q: "What is the 'Terminator' line?", a: "The line separating the day and night sides of a planet/moon.", domain: "Universe" },
  { q: "What is the Big Crunch theory?", a: "A hypothetical collapse of the universe back into a singularity.", domain: "Universe" },
  { q: "What is the 'Goldilocks Zone'?", a: "The habitable zone around a star where liquid water can exist.", domain: "Universe" },
  { q: "What is a Synchronous Rotation?", a: "When an object rotates at the same rate it orbits (why we see one side of the Moon).", domain: "Universe" },
  { q: "What is a Barycenter?", a: "The center of mass of two or more bodies that orbit each other.", domain: "Universe" },
  { q: "Define Cosmic Inflation.", a: "Rapid exponential expansion of space in the early universe.", domain: "Universe" },

  // --- GEOSPHERE (51-100) ---
  { q: "What is the primary cause of plate tectonics?", a: "Mantle convection and slab pull.", domain: "Geosphere" },
  { q: "Which wave cannot pass through the liquid outer core?", a: "S-Waves (Secondary/Shear waves).", domain: "Geosphere" },
  { q: "What is a subduction zone?", a: "Where a denser oceanic plate sinks beneath a less dense plate.", domain: "Geosphere" },
  { q: "Which crust is denser: Oceanic or Continental?", a: "Oceanic.", domain: "Geosphere" },
  { q: "Where do deep ocean trenches form?", a: "At convergent plate boundaries (subduction zones).", domain: "Geosphere" },
  { q: "What is the hardest mineral on the Mohs scale?", a: "Diamond (10).", domain: "Geosphere" },
  { q: "Difference between cleavage and fracture?", a: "Cleavage is breaking along planes; fracture is irregular.", domain: "Geosphere" },
  { q: "How is metamorphic rock formed?", a: "By heat and pressure without melting.", domain: "Geosphere" },
  { q: "What is an unconformity?", a: "A gap in the rock record due to erosion or non-deposition.", domain: "Geosphere" },
  { q: "What is the law of superposition?", a: "Oldest rock layers are on the bottom in undisturbed strata.", domain: "Geosphere" },
  { q: "What is a half-life?", a: "Time for half of a radioactive sample to decay.", domain: "Geosphere" },
  { q: "What is a transform boundary?", a: "Where plates slide past each other (e.g., San Andreas).", domain: "Geosphere" },
  { q: "What is the Moho?", a: "The boundary between the crust and the mantle.", domain: "Geosphere" },
  { q: "Define Isostasy.", a: "The equilibrium between the crust and the mantle (floating).", domain: "Geosphere" },
  { q: "What is a Batholith?", a: "A large mass of intrusive igneous rock.", domain: "Geosphere" },
  { q: "What is a Lahar?", a: "A volcanic mudflow.", domain: "Geosphere" },
  { q: "Define Orogeny.", a: "Mountain-building event.", domain: "Geosphere" },
  { q: "What is the Asthenosphere?", a: "The plastic, flowing layer of the mantle below the lithosphere.", domain: "Geosphere" },
  { q: "What is an Oxbow Lake?", a: "A curved lake formed when a river meander is cut off.", domain: "Geosphere" },
  { q: "What is Karst Topography?", a: "Landscapes shaped by dissolving limestone (caves/sinkholes).", domain: "Geosphere" },
  { q: "What is the 'Shadow Zone' for P-waves?", a: "An area where P-waves are refracted by the liquid core.", domain: "Geosphere" },
  { q: "Difference between Magma and Lava?", a: "Magma is underground; Lava is on the surface.", domain: "Geosphere" },
  { q: "What is an intrusive igneous rock?", a: "Rock formed from magma cooling slowly underground (large crystals).", domain: "Geosphere" },
  { q: "What is an extrusive igneous rock?", a: "Rock formed from lava cooling quickly on the surface (small crystals).", domain: "Geosphere" },
  { q: "Name a common sedimentary rock.", a: "Sandstone, Limestone, or Shale.", domain: "Geosphere" },
  { q: "What is Foliation?", a: "Banding or layering in metamorphic rocks.", domain: "Geosphere" },
  { q: "What is the Richter Scale?", a: "Measure of earthquake magnitude (energy).", domain: "Geosphere" },
  { q: "What is the Mercalli Scale?", a: "Measure of earthquake intensity (damage).", domain: "Geosphere" },
  { q: "What is a Shield Volcano?", a: "A broad, gently sloping volcano (e.g., Hawaii).", domain: "Geosphere" },
  { q: "What is a Stratovolcano?", a: "A tall, explosive volcano (e.g., Mt. St. Helens).", domain: "Geosphere" },
  { q: "Define Epicenter.", a: "The point on Earth's surface directly above an earthquake's focus.", domain: "Geosphere" },
  { q: "Define Focus (Hypocenter).", a: "The point inside Earth where an earthquake starts.", domain: "Geosphere" },
  { q: "What is an Aquifer?", a: "A rock layer that holds and transmits groundwater.", domain: "Geosphere" },
  { q: "What is the Water Table?", a: "The top of the saturated zone of groundwater.", domain: "Geosphere" },
  { q: "What is Erosion?", a: "The movement of sediment by wind, water, or ice.", domain: "Geosphere" },
  { q: "What is Weathering?", a: "The breaking down of rocks into sediment.", domain: "Geosphere" },
  { q: "What is a Moraine?", a: "A pile of debris deposited by a glacier.", domain: "Geosphere" },
  { q: "What is an Alluvial Fan?", a: "A fan-shaped deposit of sediment at the base of a mountain.", domain: "Geosphere" },
  { q: "What is the 'Wilson Cycle'?", a: "The cycle of opening and closing ocean basins.", domain: "Geosphere" },
  { q: "What is Pangea?", a: "The most recent supercontinent (~300 million years ago).", domain: "Geosphere" },
  { q: "Define Paleomagnetism.", a: "The study of magnetic signatures in rocks used to track plate motion.", domain: "Geosphere" },
  { q: "What are 'Hotspots'?", a: "Volcanic areas not at plate boundaries (e.g., Yellowstone).", domain: "Geosphere" },
  { q: "What is an Index Fossil?", a: "A fossil used to date rock layers (must be widespread and short-lived).", domain: "Geosphere" },
  { q: "Define Lithification.", a: "The process of turning sediment into rock (compaction/cementation).", domain: "Geosphere" },
  { q: "What is a Delta?", a: "A landform where a river meets a still body of water.", domain: "Geosphere" },
  { q: "What is a Meander?", a: "A curve in a river.", domain: "Geosphere" },
  { q: "What is the 'Great Oxygenation Event'?", a: "Cyanobacteria releasing O2, changing the atmosphere.", domain: "Geosphere" },
  { q: "Define Xenolith.", a: "A 'foreign' rock trapped inside an igneous rock.", domain: "Geosphere" },
  { q: "What is 'Slab Pull'?", a: "Gravity pulling a subducting plate down into the mantle.", domain: "Geosphere" },
  { q: "What is a Caldera?", a: "A large depression formed by a collapsed volcano.", domain: "Geosphere" },

  // --- ATMOSPHERE & OCEAN (101-150) ---
  { q: "What is the most abundant gas in the atmosphere?", a: "Nitrogen (78%).", domain: "Atmosphere" },
  { q: "In which layer does weather occur?", a: "Troposphere.", domain: "Atmosphere" },
  { q: "Why is the Stratosphere warmer at the top?", a: "Ozone absorbs UV radiation.", domain: "Atmosphere" },
  { q: "What is the Coriolis Effect?", a: "Curving of winds due to Earth's rotation.", domain: "Atmosphere" },
  { q: "What is the Dew Point?", a: "Temperature at which air becomes saturated.", domain: "Atmosphere" },
  { q: "What is Latent Heat?", a: "Energy released/absorbed during a phase change.", domain: "Atmosphere" },
  { q: "What is Rayleigh Scattering?", a: "Atmospheric scattering that makes the sky blue.", domain: "Atmosphere" },
  { q: "What is a Rain Shadow?", a: "Dry area on the leeward side of a mountain.", domain: "Atmosphere" },
  { q: "Define Relative Humidity.", a: "Actual water vapor vs. max possible water vapor.", domain: "Atmosphere" },
  { q: "What drives surface ocean currents?", a: "Wind.", domain: "Atmosphere" },
  { q: "What drives deep ocean currents?", a: "Density (Temperature and Salinity).", domain: "Atmosphere" },
  { q: "What is the Thermocline?", a: "Layer of rapid temperature change in the ocean.", domain: "Atmosphere" },
  { q: "What is the Halocline?", a: "Layer of rapid salinity change.", domain: "Atmosphere" },
  { q: "What is Upwelling?", a: "Cold, nutrient-rich water rising to the surface.", domain: "Atmosphere" },
  { q: "What is El Niño?", a: "Warming of the central/eastern Pacific waters.", domain: "Atmosphere" },
  { q: "What are Hadley Cells?", a: "Atmospheric loops from the equator to 30 degrees.", domain: "Atmosphere" },
  { q: "What is the Jet Stream?", a: "A fast-moving ribbon of air in the upper atmosphere.", domain: "Atmosphere" },
  { q: "What is an isobar?", a: "A line on a map connecting points of equal pressure.", domain: "Atmosphere" },
  { q: "What is an isotherm?", a: "A line connecting points of equal temperature.", domain: "Atmosphere" },
  { q: "Difference between High and Low pressure?", a: "High = Sinking air (clear); Low = Rising air (stormy).", domain: "Atmosphere" },
  { q: "What is a Cold Front?", a: "Cold air mass displacing warm air (fast, storms).", domain: "Atmosphere" },
  { q: "What is a Warm Front?", a: "Warm air mass displacing cold air (slow, light rain).", domain: "Atmosphere" },
  { q: "What is Adiabatic Cooling?", a: "Cooling due to air expansion as it rises.", domain: "Atmosphere" },
  { q: "What is the Lapse Rate?", a: "The rate at which temp changes with altitude.", domain: "Atmosphere" },
  { q: "Define Salinity.", a: "The amount of salt dissolved in water.", domain: "Atmosphere" },
  { q: "What is the Photic Zone?", a: "Top layer of the ocean where light allows photosynthesis.", domain: "Atmosphere" },
  { q: "What is the Benthic Zone?", a: "The ocean floor.", domain: "Atmosphere" },
  { q: "What are Trade Winds?", a: "Winds blowing toward the equator (East to West).", domain: "Atmosphere" },
  { q: "What are Westerlies?", a: "Winds blowing West to East in mid-latitudes.", domain: "Atmosphere" },
  { q: "What is an anemometer?", a: "Tool to measure wind speed.", domain: "Atmosphere" },
  { q: "What is a barometer?", a: "Tool to measure air pressure.", domain: "Atmosphere" },
  { q: "What is specific heat?", a: "Energy needed to raise the temp of 1g of substance by 1C.", domain: "Atmosphere" },
  { q: "Why do oceans heat up slower than land?", a: "Water has a higher specific heat.", domain: "Atmosphere" },
  { q: "What is the Ekman Spiral?", a: "Wind-driven current direction changing with depth.", domain: "Atmosphere" },
  { q: "What is the Pycnocline?", a: "Layer of rapid density change.", domain: "Atmosphere" },
  { q: "Define Albedo.", a: "The reflectivity of a surface.", domain: "Atmosphere" },
  { q: "What is the Greenhouse Effect?", a: "Atmosphere trapping heat to keep Earth warm.", domain: "Atmosphere" },
  { q: "What is the 'Midnight Zone'?", a: "The Bathypelagic zone (1000m-4000m).", domain: "Atmosphere" },
  { q: "What is the 'Sunlight Zone'?", a: "The Epipelagic zone (0m-200m).", domain: "Atmosphere" },
  { q: "Define Hurricane.", a: "A low-pressure system with winds over 74 mph.", domain: "Atmosphere" },
  { q: "What is a Tornado?", a: "A violent, rotating column of air.", domain: "Atmosphere" },
  { q: "What is 'Graupel'?", a: "Soft hail or snow pellets.", domain: "Atmosphere" },
  { q: "What is the Mesosphere?", a: "Coldest atmospheric layer where meteors burn.", domain: "Atmosphere" },
  { q: "What is the Thermosphere?", a: "Layer with ionosphere and auroras.", domain: "Atmosphere" },
  { q: "Define Frontogenesis.", a: "The creation or intensification of a front.", domain: "Atmosphere" },
  { q: "What is the 'Great Conveyor Belt'?", a: "Thermohaline circulation moving water globally.", domain: "Atmosphere" },
  { q: "What are gyres?", a: "Large circular surface current systems.", domain: "Atmosphere" },
  { q: "What is the 'Fetch'?", a: "The distance wind blows over open water.", domain: "Atmosphere" },
  { q: "What is a spring tide?", a: "Alignment of S-M-E causing highest tides.", domain: "Atmosphere" },
  { q: "What is a neap tide?", a: "90-degree angle of S-E-M causing lowest tides.", domain: "Atmosphere" },

  // --- HUMAN ACTIVITY & FANCY (151-200) ---
  { q: "What is the Albedo Feedback?", a: "Ice melts -> dark water absorbs heat -> more ice melts.", domain: "Human Activity" },
  { q: "What are Milankovitch Cycles?", a: "Orbital changes that drive ice ages.", domain: "Human Activity" },
  { q: "Define Eutrophication.", a: "Excess nutrients leading to oxygen-depleted dead zones.", domain: "Human Activity" },
  { q: "What is Carbon Sequestration?", a: "Storing carbon underground or in forests.", domain: "Human Activity" },
  { q: "What is an Invasive Species?", a: "Non-native species that harms an ecosystem.", domain: "Human Activity" },
  { q: "Define Sustainability.", a: "Meeting needs today without compromising the future.", domain: "Human Activity" },
  { q: "What is a Carbon Sink?", a: "Something that absorbs more CO2 than it releases (e.g., ocean).", domain: "Human Activity" },
  { q: "What is Acid Rain?", a: "Rain with low pH due to sulfur/nitrogen pollutants.", domain: "Human Activity" },
  { q: "What is Ocean Acidification?", a: "CO2 absorption making ocean water more acidic (low pH).", domain: "Human Activity" },
  { q: "What is the 'Keeling Curve'?", a: "Graph showing CO2 rising since 1958.", domain: "Human Activity" },
  { q: "Define Renewable Energy.", a: "Energy from sources that don't run out (Solar, Wind).", domain: "Human Activity" },
  { q: "Define Non-Renewable Energy.", a: "Energy from finite sources (Coal, Oil).", domain: "Human Activity" },
  { q: "What is Geothermal Energy?", a: "Heat from inside the Earth.", domain: "Human Activity" },
  { q: "What is Hydroelectric Power?", a: "Energy from moving water.", domain: "Human Activity" },
  { q: "What are CFCs?", a: "Chemicals that destroy the Ozone layer.", domain: "Human Activity" },
  { q: "What is the Montreal Protocol?", a: "Global treaty to phase out CFCs.", domain: "Human Activity" },
  { q: "What is the Kyoto Protocol?", a: "Agreement to reduce Greenhouse Gas emissions.", domain: "Human Activity" },
  { q: "Define Urban Heat Island.", a: "Cities being warmer than rural areas.", domain: "Human Activity" },
  { q: "What is Biomagnification?", a: "Toxins becoming more concentrated up the food chain.", domain: "Human Activity" },
  { q: "What is a Trophic Level?", a: "A step in a food chain (Producer, Consumer).", domain: "Human Activity" },
  { q: "What is Isostatic Rebound?", a: "Land rising after a heavy glacier melts.", domain: "Human Activity" },
  { q: "What is Precession?", a: "Earth's axial wobble (26k year cycle).", domain: "Human Activity" },
  { q: "What is Obliquity?", a: "Changes in Earth's tilt (41k year cycle).", domain: "Human Activity" },
  { q: "What is Eccentricity?", a: "Changes in Earth's orbital shape (100k year cycle).", domain: "Human Activity" },
  { q: "What is Proxy Data?", a: "Indirect climate records (Tree rings, Ice cores).", domain: "Human Activity" },
  { q: "What is the 'Cryosphere'?", a: "All frozen water on Earth.", domain: "Human Activity" },
  { q: "What is Outgassing?", a: "Volcanoes releasing gases to form the atmosphere.", domain: "Human Activity" },
  { q: "Define Bathymetry.", a: "Measuring ocean depths.", domain: "Human Activity" },
  { q: "What is a Hotspot?", a: "Volcanic area away from plate edges (e.g., Hawaii).", domain: "Human Activity" },
  { q: "What is Solar Wind?", a: "Charged particles streaming from the Sun.", domain: "Human Activity" },
  { q: "Define Neutron Star.", a: "Collapsed core of a massive star.", domain: "Human Activity" },
  { q: "What is the Doppler Effect?", a: "Frequency change based on movement (Sound/Light).", domain: "Human Activity" },
  { q: "What is Accretion?", a: "Gravity pulling matter together to form planets.", domain: "Human Activity" },
  { q: "Define Tsunami.", a: "Sea wave caused by sub-sea earthquakes.", domain: "Human Activity" },
  { q: "Define Pyroclastic Flow.", a: "Superheated gas and ash from a volcano.", domain: "Human Activity" },
  { q: "Define Liquefaction.", a: "Soil turning to 'liquid' during an earthquake.", domain: "Human Activity" },
  { q: "What is an Oxbow Lake?", a: "Meander cutoff from a river.", domain: "Human Activity" },
  { q: "Define Permeability.", a: "How easily water flows through rock.", domain: "Human Activity" },
  { q: "Define Porosity.", a: "Amount of open space in rock.", domain: "Human Activity" },
  { q: "Define Infiltration.", a: "Water soaking into the ground.", domain: "Human Activity" },
  { q: "Define Transpiration.", a: "Plants 'breathing' out water vapor.", domain: "Human Activity" },
  { q: "What is Fission?", a: "Splitting an atom for energy.", domain: "Human Activity" },
  { q: "What is Fusion?", a: "Combining atoms for energy (Stars).", domain: "Human Activity" },
  { q: "What is the 'Great Conveyor Belt'?", a: "Thermohaline circulation.", domain: "Human Activity" },
  { q: "Define 'Photic Zone'.", a: "Sunlit top of the ocean.", domain: "Human Activity" },
  { q: "Define 'Pelagic Zone'.", a: "Open ocean water.", domain: "Human Activity" },
  { q: "Define 'Abyssal Plain'.", a: "Flat, deep ocean floor.", domain: "Human Activity" },
  { q: "Define 'Continental Shelf'.", a: "Shallow underwater edge of a continent.", domain: "Human Activity" },
  { q: "Define 'Subduction'.", a: "One plate sliding under another.", domain: "Human Activity" },
  { q: "Define 'Orogeny'.", a: "Mountain building.", domain: "Human Activity" }
];

const Dashboard = () => {
  const [altitude, setAltitude] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('Atmosphere');
  const [quizIdx, setQuizIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [auInput, setAuInput] = useState(1);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setAltitude(a => {
          const change = mode === 'Atmosphere' ? 500 : -250;
          const next = a + change;
          if (mode === 'Atmosphere' && next > 100000) return 100000;
          if (mode === 'Ocean' && next < -11000) return -11000;
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isActive, mode]);

  const getCurrentLayer = () => {
    const v = Math.abs(altitude);
    if (mode === 'Atmosphere') {
      if (v < 12000) return { name: "Troposphere", note: "Weather & 80% Mass" };
      if (v < 50000) return { name: "Stratosphere", note: "Ozone Layer" };
      if (v < 85000) return { name: "Mesosphere", note: "Meteor Friction" };
      if (v < 100000) return { name: "Thermosphere", note: "Ionosphere/Auroras" };
      return { name: "Exosphere", note: "Space Border" };
    } else {
      if (v < 200) return { name: "Epipelagic", note: "Photosynthesis Zone" };
      if (v < 1000) return { name: "Mesopelagic", note: "Twilight / Thermocline" };
      if (v < 4000) return { name: "Bathypelagic", note: "Midnight Zone" };
      if (v < 6000) return { name: "Abyssopelagic", note: "Abyssal Plain" };
      return { name: "Hadalpelagic", note: "Subduction Trenches" };
    }
  };

  const layer = getCurrentLayer();
  const rocketPos = (altitude / 100000) * 85;
  const diverPos = (Math.abs(altitude) / 11000) * 85;
  const keplerCalc = (a) => Math.sqrt(Math.pow(a, 3)).toFixed(2);

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'monospace' }}>
      <header style={{ padding: '15px 30px', borderBottom: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between', background: '#0f172a' }}>
        <h2 style={{ margin: 0, color: '#38bdf8' }}>MTEL 74 // RESEARCH OS</h2>
        <div style={{ color: '#94a3b8' }}>USER: PAULA // STATUS: {isActive ? 'SIMULATING' : 'IDLE'}</div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', flex: 1, padding: '20px', gap: '20px' }}>
        
        {/* SIMULATOR */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ background: mode === 'Atmosphere' ? 'linear-gradient(#000, #0c4a6e, #7dd3fc)' : 'linear-gradient(#7dd3fc, #0c4a6e, #020617)', height: '400px', borderRadius: '12px', border: '1px solid #38bdf8', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(15, 23, 42, 0.9)', padding: '10px', borderRadius: '8px', border: '1px solid #38bdf8', zIndex: 10 }}>
                <div style={{ color: '#38bdf8', fontSize: '0.7rem' }}>REGION: {layer.name}</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{Math.abs(altitude).toLocaleString()}m</div>
                <small style={{ color: '#94a3b8' }}>{layer.note}</small>
            </div>
            <div style={{ position: 'absolute', bottom: mode === 'Atmosphere' ? `${rocketPos}%` : 'auto', top: mode === 'Ocean' ? `${diverPos}%` : 'auto', left: '45%', fontSize: '4rem', transition: '0.1s linear' }}>
              {mode === 'Atmosphere' ? '🚀' : '🤿'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setIsActive(!isActive)} style={{ flex: 1, padding: '12px', background: isActive ? '#ef4444' : '#38bdf8', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px' }}>{isActive ? 'HALT' : 'LAUNCH'}</button>
            <button onClick={() => {setMode(mode === 'Atmosphere' ? 'Ocean' : 'Atmosphere'); setAltitude(0);}} style={{ flex: 1, padding: '12px', background: '#334155', border: 'none', color: '#fff', cursor: 'pointer', borderRadius: '4px' }}>SWAP MODE</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #ffcc00' }}>
               <div style={{ color: '#ffcc00', fontSize: '0.7rem' }}>KEPLER (P²=a³)</div>
               <input type="number" value={auInput} onChange={(e) => setAuInput(e.target.value)} style={{ width: '50px', background: '#0f172a', color: '#fff', border: '1px solid #334155' }} /> AU
               <div style={{ marginTop: '5px' }}>Year: {keplerCalc(auInput)}</div>
            </div>
            <div style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', border: '1px solid #4ade80' }}>
               <div style={{ color: '#4ade80', fontSize: '0.7rem' }}>PRECESSION</div>
               <div style={{ fontSize: '0.8rem' }}>North: Polaris</div>
               <div style={{ fontSize: '0.8rem' }}>Future: Vega</div>
            </div>
          </div>
        </section>

        {/* QUIZ SECTION (NOW WITH 200 QUESTIONS + BACK BUTTON) */}
        <section style={{ background: '#0f172a', borderRadius: '12px', padding: '20px', border: '1px solid #1e293b', overflowY: 'auto' }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '10px' }}>VERIFICATION QUIZ ({quizIdx + 1}/{MTEL_QUIZ.length})</h3>
          <div style={{ background: '#1e293b', padding: '20px', borderRadius: '8px', minHeight: '180px' }}>
            <small style={{ color: '#38bdf8' }}>{MTEL_QUIZ[quizIdx]?.domain.toUpperCase()}</small>
            <p style={{ fontSize: '1.1rem', margin: '10px 0' }}>{MTEL_QUIZ[quizIdx]?.q}</p>
            {showAnswer && <p style={{ color: '#4ade80', borderTop: '1px solid #334155', paddingTop: '10px' }}>{MTEL_QUIZ[quizIdx]?.a}</p>}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button onClick={() => {setQuizIdx((quizIdx - 1 + MTEL_QUIZ.length) % MTEL_QUIZ.length); setShowAnswer(false);}} style={{ flex: 1, padding: '10px', background: '#334155', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>BACK</button>
            <button onClick={() => setShowAnswer(!showAnswer)} style={{ flex: 1, padding: '10px', background: '#334155', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>{showAnswer ? 'HIDE' : 'ANSWER'}</button>
            <button onClick={() => {setQuizIdx((quizIdx + 1) % MTEL_QUIZ.length); setShowAnswer(false);}} style={{ flex: 1, padding: '10px', background: '#38bdf8', color: '#000', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>NEXT</button>
          </div>

          <div style={{ marginTop: '20px' }}>
             <HRDiagram />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
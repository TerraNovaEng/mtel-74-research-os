// src/HRDiagram.jsx
import React from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Label
} from 'recharts';

// Data representing different star types
const starData = [
  // --- Main Sequence (The band where stars spend 90% of their lives) ---
  { temperature: 35000, luminosity: 100000, type: 'Main Sequence (Hot/Blue)', name: 'O-Type Star' },
  { temperature: 15000, luminosity: 10000, type: 'Main Sequence (Blue-White)', name: 'B-Type Star' },
  { temperature: 9000,  luminosity: 100,   type: 'Main Sequence (White)', name: 'A-Type Star' },
  { temperature: 6500,  luminosity: 5,     type: 'Main Sequence (Yellow-White)', name: 'F-Type Star' },
  { temperature: 5800,  luminosity: 1,     type: 'Main Sequence (Yellow)', name: 'Our Sun (G-Type)' }, // THE SUN!
  { temperature: 4000,  luminosity: 0.1,   type: 'Main Sequence (Orange)', name: 'K-Type Star' },
  { temperature: 3000,  luminosity: 0.001, type: 'Main Sequence (Red Dwarf)', name: 'M-Type Star' },

  // --- Giants & Supergiants (End of life for medium/high mass stars) ---
  { temperature: 3500, luminosity: 1000,   type: 'Red Giant', name: 'Aldebaran' },
  { temperature: 3000, luminosity: 50000,  type: 'Red Supergiant', name: 'Betelgeuse' },
  { temperature: 12000, luminosity: 80000, type: 'Blue Supergiant', name: 'Rigel' },

  // --- White Dwarfs (End of life for low-mass stars like our Sun) ---
  { temperature: 20000, luminosity: 0.01,  type: 'White Dwarf', name: 'Sirius B' },
  { temperature: 10000, luminosity: 0.001, type: 'White Dwarf', name: 'Procyon B' },
];

// Color map for star types
const colors = {
  'Main Sequence (Hot/Blue)': '#00ccff',
  'Main Sequence (Blue-White)': '#66ffff',
  'Main Sequence (White)': '#ffffff',
  'Main Sequence (Yellow-White)': '#ffffcc',
  'Main Sequence (Yellow)': '#ffff00',
  'Main Sequence (Orange)': '#ff9900',
  'Main Sequence (Red Dwarf)': '#ff0000',
  'Red Giant': '#ff6600',
  'Red Supergiant': '#cc0000',
  'Blue Supergiant': '#0066ff',
  'White Dwarf': '#cccccc',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: '#222', padding: '10px', border: `1px solid ${colors[data.type]}` }}>
        <p style={{ color: '#fff', fontWeight: 'bold', margin: 0 }}>{data.name}</p>
        <p style={{ color: colors[data.type], margin: '5px 0' }}>{data.type}</p>
        <p style={{ color: '#aaa', fontSize: '0.8rem', margin: 0 }}>Temp: {data.temperature} K</p>
        <p style={{ color: '#aaa', fontSize: '0.8rem', margin: 0 }}>Lum: {data.luminosity} x Sun</p>
      </div>
    );
  }
  return null;
};

const HRDiagram = () => {
  return (
    <div style={{ width: '100%', height: 400, backgroundColor: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
      <h3 style={{ color: '#00ffcc', textAlign: 'center', marginTop: 0 }}>Hertzsprung-Russell Diagram</h3>
      <ResponsiveContainer>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          {/* X-Axis: Reversed! Hot on the left, cool on the right */}
          <XAxis type="number" dataKey="temperature" name="Temperature" unit="K" reversed={true} domain={[2000, 40000]} stroke="#00ffcc">
            <Label value="Surface Temperature (K) - <-- Hotter" offset={0} position="bottom" style={{ fill: '#00ffcc' }} />
          </XAxis>
          {/* Y-Axis: Logarithmic scale for Luminosity */}
          <YAxis type="number" dataKey="luminosity" name="Luminosity" scale="log" domain={[0.0001, 1000000]} stroke="#00ffcc">
             <Label value="Luminosity (Sun = 1) - Brighter -->" angle={-90} position="left" style={{ fill: '#00ffcc' }} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Stars" data={starData}>
            {starData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.type]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', fontSize: '0.7rem', color: '#666', marginTop: '10px' }}>
        MTEL NOTE: Remember the axis directions! Hot is left, bright is up.
      </div>
    </div>
  );
};

export default HRDiagram;
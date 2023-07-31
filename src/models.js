import PhraseModel from './model.js';

const initialCadenceData = {
  name: '',
  displayName: 'Initialmodell',
  description: 'Erklingt meistens am Anfang eines musikalischen Abschnitts.',
  voiceUpper: ['g', 'f', 'f', 'e'],
  voiceInner: ['e', 'd', 'd', 'c'],
  voiceLower: ['C', 'C', 'B,', 'C'],
  defaultValue: 2
};

const circleOfFifthsData = {
  name: '',
  displayName: 'Quintfallsequenz',
  description: 'Erklingt gefühlt in 50% der Musik des 17. und 18. Jahrhunderts.',
  voiceUpper: ['g', 'a', 'a', 'g', 'g', 'f', 'f', 'e'],
  voiceInner: ['e', 'e', 'd', 'd', 'c', 'c', 'B', 'c'],
  voiceLower: ['C', 'F,', 'B,', 'E,', 'A,', 'D,', 'G,', 'C,'],
  defaultValue: 2
};

const modulationFifthUpData = {
  name: '',
  displayName: 'Oberquintmodulationsmodell',
  description: 'Standardmodulation in die Tonart der Oberquinte.',
  voiceUpper: ['e', 'd', 'd', 'c', 'c', 'B'],
  voiceInner: ['G', '^F', 'G', 'G', '^F', 'G'],
  voiceLower: ['C', 'C', 'B,', 'A,', 'D,', 'G,'],
  defaultValue: 2
};

// Model instances for export
const InitialCadence = new PhraseModel(initialCadenceData);
const CircleOfFifths = new PhraseModel(circleOfFifthsData);
const ModulationFifthUp = new PhraseModel(modulationFifthUpData);

// Exporting the models and the function to create playable arrays from model voices.
export const Models = {
  InitialCadence,
  CircleOfFifths,
  ModulationFifthUp
};

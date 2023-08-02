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

const paralelismData = {
  name: '',
  displayName: 'Parallelismus',
  description: 'Die andere Welt der Sequenzen (in Terzen).',
  voiceUpper: ['e', 'd', 'c', 'B', 'A', 'G'],
  voiceInner: ['c', 'B', 'A', 'G', 'F', 'E'],
  voiceLower: ['C', 'G,', 'A,', 'E,', 'F,', 'C,'],
  defaultValue: 2
};

const paralelismWithSyncopationsData = {
  name: '',
  displayName: 'Parallelismus',
  description: 'Die andere Welt der Sequenzen (in Terzen).',
  voiceUpper: ['e', 'd', 'd', 'c', 'c', 'B', 'B', 'A', 'A', 'G', 'G'],
  voiceInner: ['c', 'c', 'B', 'B', 'A', 'A', 'G', 'G', 'F', 'F', 'E'],
  voiceLower: ['C', 'G,', 'G,', 'A,', 'A,', 'E,', 'E,', 'F,', 'F,', 'C,', 'C,'],
  defaultValue: 2
};

const diminishedParalelismWithSyncopationsData = {
  name: '',
  displayName: 'Parallelismus',
  description: 'Die andere Welt der Sequenzen (in Terzen).',
  voiceUpper: ['e', 'd', 'd', 'c', 'c', '_B', '_B', 'A', 'A', 'G', 'G', 'F'],
  voiceInner: ['c', 'c', 'B', 'B', 'A', 'A', 'G', 'G', 'F', 'F', 'E', 'D'],
  voiceLower: ['E,', '^F,', '^G,', 'A,', 'C,', 'D,', 'E,', 'F,', 'A,,', 'B,,', '^C,', 'D,'],
  defaultValue: 2
};

// Model instances for export
const InitialCadence = new PhraseModel(initialCadenceData);
const CircleOfFifths = new PhraseModel(circleOfFifthsData);
const ModulationFifthUp = new PhraseModel(modulationFifthUpData);
const Paralelism = new PhraseModel(paralelismData);
const ParalelismWithSyncopations = new PhraseModel(paralelismWithSyncopationsData);
const DiminishedParalelismWithSyncopations = new PhraseModel(diminishedParalelismWithSyncopationsData);

// Exporting the models and the function to create playable arrays from model voices.
export const Models = {
  InitialCadence,
  CircleOfFifths,
  ModulationFifthUp,
  Paralelism,
  ParalelismWithSyncopations,
  DiminishedParalelismWithSyncopations
};

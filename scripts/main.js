import { getMidiValueFromAbcNoteName, playTimeLineObj } from "./utils.js";

function noteToFreq(note, halfTones = 0) {
  return Tone.Frequency(note, 'midi').transpose(halfTones);
}

const abcTimeLineObj = {
  0: {
    arrays: [['g', 'e', 'C']],
    durations: [2]
  },
  1: {
    arrays: [['f', 'd'], ['C']],
    durations: [4, 2]
  },
  2: {
    arrays: [['B,']],
    durations: [2]
  },
  3: {
    arrays: [['e', 'c', 'C']],
    durations: [2]
  }
};

const freqTimeLineObj = {
  0: {
    arrays: convertAbcArrToFreqArr(abcTimeLineObj[0].arrays),
    durations: [2]
  },
  1: {
    arrays: convertAbcArrToFreqArr(abcTimeLineObj[1].arrays),
    durations: [4, 2]
  },
  2: {
    arrays: convertAbcArrToFreqArr(abcTimeLineObj[2].arrays),
    durations: [2]
  },
  3: {
    arrays: convertAbcArrToFreqArr(abcTimeLineObj[3].arrays),
    durations: [2]
  }
};

const timeLineObj = {
  current: freqTimeLineObj
};

document.querySelector('#btn').addEventListener('click', () => {
  playTimeLineObj(timeLineObj.current);
});

function convertAbcArrToFreqArr(arrs) {
  return arrs.map(x => x.map(y => noteToFreq(getMidiValueFromAbcNoteName(y))));
}

const modelA = {
  'v0': 'g2 | f4 | e2',
  'v1': 'e2 | d4 | c2',
  'v2': 'C2 | C2 B,2 | C2',
  'numberOfVoices': 3,
  'numberOfBeats': 8
}
const modelB = {
  'v0': 'g2 | a4 | g4 | f4 | e2',
  'v1': 'e2 | e2  d2 | d2 c2 | c2 B2 | c2',
  'v2': 'C2| F,2 B,2 | E,2 A,2| D,2 G,2 | C,2',
  'numberOfVoices': 3,
  'numberOfBeats': 16
}
const modelC = {
  'v0': 'e2 | d4 | c4 | B2',
  'v1': 'G2 | ^F2  G2 | G2 ^F2 | G2',
  'v2': 'C,2| C,2 B,2 | A,2 D,2| G,2',
  'numberOfVoices': 3,
  'numberOfBeats': 12
}
const modelD = {
  'v0': 'B2 | A4 | B2',
  'v1': 'G2 | G2 ^F2 | G2',
  'v2': 'B,,2| C,2 D,2 | G,2',
  'numberOfVoices': 3,
  'numberOfBeats': 8
}

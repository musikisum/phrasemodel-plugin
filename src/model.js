// PhraseModel Class

export default class PhraseModel {
  constructor(model) {
    this.name = model.name;
    this.description = model.description;
    this.voiceUpper = model.voiceUpper;
    this.voiceInner = model.voiceInner;
    this.voiceLower = model.voiceLower;
    this.defaultValue = model.defaultValue;
  }

  getChords() {
    return this.voiceUpper.reduce((akku, item, index) => {
      akku.push([item, this.voiceInner[index], this.voiceLower[index], this.defaultValue]);
      return akku;
    }, []);
  }

  // Generate an array for tonejs playback function
  getPlayableArray(withSyncopations) {
    const numberOfScaleDegrees = this.voiceUpper.length;
    const chordsArr = this.getChords();
    if (!withSyncopations) {
      return chordsArr.map(arr => [arr]);
    }
    const playArrs = [];
    let indexChord;
    let nextIndexChord;
    for (let i = 0; i < numberOfScaleDegrees; i += 1) {
      if (i + 1 < numberOfScaleDegrees) {
        indexChord = chordsArr[i];
        nextIndexChord = chordsArr[i + 1];
        const indices = this.arrayComparer(indexChord, nextIndexChord);
        if (indices.length) {
          // split and store arrays, if scale degree repetitions has matched
          const tempChord = [this.defaultValue * 2];
          for (let y = 0; y < indices.length; y += 1) {
            tempChord.unshift(indexChord[indices[y][0]]);
            indexChord[indices[y][0]] = null;
            nextIndexChord[indices[y][1]] = null;
          }
          playArrs.push([tempChord, this.removeSpecialValuesFromArray(indexChord, null)]);
          nextIndexChord = this.removeSpecialValuesFromArray(nextIndexChord, null);
        } else {
          // store copy of indexChord, if no value matched
          playArrs.push([[...this.removeSpecialValuesFromArray(indexChord, null)]]);
        }
      } else {
        playArrs.push([this.removeSpecialValuesFromArray(chordsArr[i], null)]);
      }
    }
    return playArrs;
  }

  // Compares two arrays and returns arrays with indices for duplicate scale degrees.
  arrayComparer(arr1, arr2) {
    if (typeof arr2 === 'undefined') {
      return [];
    }
    const indices = [];
    for (let i = 0; i < arr1.length - 1; i += 1) {
      const contains = arr2.indexOf(arr1[i]);
      if (contains > -1) {
        indices.push([i, contains]);
      }
    }
    return indices;
  }

  // Remove special values
  removeSpecialValuesFromArray(chord, valueToDelete) {
    return chord.filter(scaleDegree => scaleDegree !== valueToDelete);
  }
}

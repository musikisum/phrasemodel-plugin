/* eslint-disable no-console */
import { Button } from 'antd';
import Models from './models.js';
import { useTranslation } from 'react-i18next';
import { useToneJsSampler } from './scripts/hooks.js';
import React, { useEffect, useRef } from 'react';
// import Logger from '@educandu/educandu/common/logger.js';
import { getMidiValueFromAbcNoteName, midiToFrequency } from './scripts/utils.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

// const logger = new Logger(import.meta.url);

export default function PhraseModelsDisplay({ content }) {

  // Custom hooks returning state/ref variables
  const [sampler, hasSamplerLoaded] = useToneJsSampler(); // ref

  const stopPlayback = useRef(false);
  const timeLineObj = useRef(null);

  const playTimeLineObjRef = useRef(null);

  const { t } = useTranslation('musikisum/educandu-plugin-phrase-models');

  const timeValue = 0.5;

  const handlePlayButtonClick = () => {
    playTimeLineObjRef.current();
  };

  useEffect(() => {
    console.log(Models);
    const temp = content.phraseModels.map(name => {
      console.log(name);
      const mod = Models[name];
      return mod.getPlayableArray(true);
    });
    timeLineObj.current = temp;
  }, []);

  useEffect(() => {

    if (!timeLineObj) {
      return;
    }

    function noteToFreqency(note) {
      // eslint-disable-next-line new-cap
      return midiToFrequency(note, 'midi');
    }

    function convertAbcArrToFreqArr(pitches) {
      return pitches.map(pitch => {
        const midiVal = getMidiValueFromAbcNoteName(pitch);
        const freq = noteToFreqency(midiVal);
        return freq;
      });
    }

    playTimeLineObjRef.current = async () => {
      const models = timeLineObj.current;
      for (const model of models) {
        for (const rhythmicPosition of model) {
          for (const pitchGroup of rhythmicPosition) {
            if (stopPlayback.current) {
              return;
            }
            const pitches = pitchGroup.slice(0, -1);
            const duration = pitchGroup[pitchGroup.length - 1];
            sampler.current.triggerAttackRelease(convertAbcArrToFreqArr(pitches), timeValue * duration);
          }
          await new Promise(res => {
            setTimeout(() => {
              res();
            }, 1000);
          });
        }
      }
    };

  }, [timeLineObj, sampler]);

  // TODO: Stop notes immediately
  useEffect(() => {
    return function cleanUp() {
      if (sampler && hasSamplerLoaded) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        sampler.current.releaseAll();
        stopPlayback.current = true;
      }
    };
  });

  return (
    <div className="EP_Educandu_Phrase_Models_Display">
      <div>{t('name')}</div>
      <Button id="btn" type="primary" icon={null} onClick={handlePlayButtonClick}>
        Play!
      </Button>
    </div>
  );
}

PhraseModelsDisplay.propTypes = {
  ...sectionDisplayProps
};

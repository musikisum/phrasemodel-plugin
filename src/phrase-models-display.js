/* eslint-disable no-console */
import { Button } from 'antd';
import { ModelA, ModelB, ModelC } from './models.js';
import { useTranslation } from 'react-i18next';
// import { PlusOutlined } from '@ant-design/icons';
import { useToneJsSampler } from './scripts/hooks.js';
import React, { useEffect, useState, useRef } from 'react';
// import Logger from '@educandu/educandu/common/logger.js';
import { getMidiValueFromAbcNoteName } from './scripts/utils.js';
import { sectionDisplayProps } from '@educandu/educandu/ui/default-prop-types.js';

// const logger = new Logger(import.meta.url);

export default function PhraseModelsDisplay({ content }) {

  // Custom hooks returning state/ref variables
  const [sampler, toneNs] = useToneJsSampler(); // [ref, state]

  const timeLineObj = useRef(null);

  const playTimeLineObjRef = useRef(null);

  const { t } = useTranslation('musikisum/educandu-plugin-phrase-models');

  const timeValue = 0.5;

  const handlePlayButtonClick = () => {
    playTimeLineObjRef.current();
  };

  useEffect(() => {

    timeLineObj.current = ModelB;

  }, []);

  useEffect(() => {

    if (!timeLineObj) {
      return;
    }

    function noteToFreq(note, halfTones = 0) {
      return toneNs.Frequency(note, 'midi').transpose(halfTones);
    }

    function convertAbcArrToFreqArr(pitches) {
      return pitches.map(pitch => { 
        const midiVal = getMidiValueFromAbcNoteName(pitch);
        const freq = noteToFreq(midiVal)
        return freq;
      });
    }

    playTimeLineObjRef.current = async () => {
      const model = timeLineObj.current;

      for (const rhythmicPosition of model) {
        
        for (const pitchGroup of rhythmicPosition) {          
          const pitches = pitchGroup.slice(0, -1);
          const duration = pitchGroup[pitchGroup.length - 1]      
          sampler.current.triggerAttackRelease(convertAbcArrToFreqArr(pitches), timeValue * duration);
        }
        await new Promise(res => {
          setTimeout(() => {
            res();
          }, 1000);
        });
      }
    };

  }, [timeLineObj, sampler, toneNs]);

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

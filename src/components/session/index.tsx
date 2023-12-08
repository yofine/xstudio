import React from 'react';
import { SessionMessageType } from '@/types/components';
import { getRandom } from '../../utils/utils';
import classNames from 'classnames';

import './index.less';

type PromptSessionPropsType = {
  sessionList: SessionMessageType[];
};

const PromptSession = (props: PromptSessionPropsType) => {
  const { sessionList } = props;

  return (
    <div className="prompt-session">
      <div className="prompt-session-wrapper">
        {(sessionList || []).map((s) => {
          return (
            <div key={getRandom()} className="prompt-session-message">
              <div
                className={classNames('prompt-session-message-balloon ', {
                  'prompt-session-message-right': s.type === 'post',
                })}
              >
                <span>{s.message}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PromptSession;

import { PullContainerState } from 'app/containers/PullContainer/types';
import { UserDataState } from 'app/containers/UserData/types';
import { User } from './interfaces';
import { ContentState } from 'app/containers/Content/types';
import { WrapperState } from 'app/containers/Wrapper/types';
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  pullContainer?: PullContainerState;
  userData?: UserDataState;
  content?: ContentState;
  wrapper?: WrapperState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
}

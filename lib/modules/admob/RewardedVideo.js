import { NativeModules } from 'react-native';
import { statics } from './';
import { nativeToJSError } from '../../utils';

const FirebaseAdMob = NativeModules.RNFirebaseAdmob;

export default class RewardedVideo {

  constructor(admob: Object, adunit: string) {
    this.admob = admob;
    this.adUnit = adunit;
    this.loaded = false;
    this.admob.on(`rewarded_video_${adunit}`, this._onRewardedVideoEvent.bind(this));
  }

  /**
   * Handle a JS emit event
   * @param event
   * @private
   */
  _onRewardedVideoEvent(event) {
    const eventType = `rewarded_video:${this.adUnit}:${event.type}`;

    let emitData = Object.assign({}, event);

    switch (event.type) {
      case 'onAdLoaded':
        this.loaded = true;
        break;
      case 'onAdFailedToLoad':
        emitData = nativeToJSError(event.payload.code, event.payload.message);
        emitData.type = event.type;
        break;
      default:
    }

    this.admob.emit(eventType, emitData);
    this.admob.emit(`rewarded_video:${this.adUnit}:*`, emitData);
  }

  /**
   * Load an ad with an instance of AdRequest
   * @param request
   * @returns {*}
   */
  loadAd(request: AdRequest) {
    return FirebaseAdMob.rewardedVideoLoadAd(this.adUnit, request);
  }

  /**
   * Return a local instance of isLoaded
   * @returns {boolean}
   */
  isLoaded() {
    return this.loaded;
  }

  /**
   * Show the advert - will only show if loaded
   * @returns {*}
   */
  show() {
    if (this.loaded) {
      FirebaseAdMob.rewardedVideoShowAd(this.adUnit);
    }
  }

  /**
   * Listen to an Ad event
   * @param eventType
   * @param listenerCb
   * @returns {null}
   */
  on(eventType, listenerCb) {
    if ((eventType !== 'onRewarded' || eventType !== 'onRewardedVideoStarted') && !statics.EventTypes[eventType]) {
      console.warn(`Invalid event type provided, must be one of: ${Object.keys(statics.EventTypes).join(', ')}, onRewarded, onRewardedVideoStarted`);
      return null;
    }

    return this.admob.on(`rewarded_video:${this.adUnit}:${eventType}`, listenerCb);
  }
}
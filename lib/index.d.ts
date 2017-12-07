// Type definitions for React Native Firebase  v1.0.0-alpha7
// Project: https://github.com/invertase/react-native-firebase
// Definitions by: Tal <https://github.com/taljacobson>
// TypeScript Version: 2.1

type AuthProvider = {
  PROVIDER_ID: string,
  credential: (token: string, secret?: string) => object,
};

declare class Trace {
  constructor(perf: Object, identifier: string)
  start(): void
  stop(): void
  incrementCounter(event: string): void
}
declare class Perf {
  setPerformanceCollectionEnabled(enabled: boolean): void;
  newTrace(id: string): Trace;
  [key: string]: any;
}

declare class Config {
  enableDeveloperMode(): void;
  setDefaults(defaults: any): void;
  /** 
   * Fetches the remote config data from Firebase, defined in the dashboard. If duration is defined (seconds), data will be locally cached for this duration.
   * The default duration is 43200 seconds (12 hours). To force a cache refresh call the method with a duration of 0.
   */
  fetch(duration: number): Promise<any>;
  activateFetched(): Promise<boolean>;
  getValue(key: string): Promise<any>;
  getValues(array: string[]): Promise<any>;
  getKeysByPrefix(prefix): Promise<string[]>;
  setDefaultsFromResource(filename: string | number): void;
  [key: string]: any;
}

declare class Link {
  createDynamicLink(parameters: any): Promise<any>;
  createShortDynamicLink(parameters: any): Promise<any>;
  getInitialLink(): Promise<any>;
  onLink(listener: Function): Function;
  [key: string]: any;
}
declare class FireBase {
  constructor(config?: RNFirebase.configurationOptions)
  admob: any;
  firestore: {
    (): firestore.Firestore;
  }; 

  config(): Config;

  links(): Link;

  /**
   * Firebase Performance Monitoring captures a number of traces automatically, such as all outbound HTTP requests, app boot time and more. 
   */
  perf(): Perf;

  log: any;

  analytics(): RNFirebase.Analytics;

  on(type: string, handler: (msg: any) => void): any;

  database: {
    (): RNFirebase.database.Database
    ServerValue: {
      TIMESTAMP: number
    }
  };

  auth: {
    (): RNFirebase.auth.Auth
    EmailAuthProvider: AuthProvider,
    PhoneAuthProvider: AuthProvider,
    GoogleAuthProvider: AuthProvider,
    GithubAuthProvider: AuthProvider,
    TwitterAuthProvider: AuthProvider,
    FacebookAuthProvider: AuthProvider,
    PhoneAuthState: {
      CODE_SENT: string,
      AUTO_VERIFY_TIMEOUT: string,
      AUTO_VERIFIED: string,
      ERROR: string,
    },
  };

  /**RNFirebase mimics the Web Firebase SDK Storage,
   * whilst providing some iOS and Android specific functionality.
   */
  storage(): RNFirebase.storage.Storage;

  /**
   * Firebase Cloud Messaging (FCM) allows you to send push messages at no cost to both Android & iOS platforms.
   * Assuming the installation instructions have been followed, FCM is ready to go.
   * As the Firebase Web SDK has limited messaging functionality,
   * the following methods within react-native-firebase have been created to handle FCM in the React Native environment.
   */
  messaging(): RNFirebase.messaging.Messaging;

  /**
   * RNFirebase provides crash reporting for your app out of the box.
   * Please note crashes do not appear in real-time on the console,
   * they tend to take a number of hours to appear
   * If you want to manually report a crash,
   * such as a pre-caught exception this is possible by using the report method.
   */
  crash(): RNFirebase.crash.Crash;

  apps: Array<string>;
  googleApiAvailability: RNFirebase.GoogleApiAvailabilityType;

  static initializeApp(options?: any | RNFirebase.configurationOptions, name?: string): FireBase;

  static app(name?: string): FireBase;

  [key: string]: any;
}

declare namespace RNFirebase {
  interface RnError extends Error {
    code?: string;
  }

  type GoogleApiAvailabilityType = {
    status: number,
    isAvailable: boolean,
    isUserResolvableError?: boolean,
    error?: string
  };

  /**
   * pass custom options by passing an object with configuration options.
   * The configuration object will be generated first by the native configuration object, if set and then will be overridden if passed in JS.
   * That is, all of the following key/value pairs are optional if the native configuration is set.
   */
  interface configurationOptions {
    /**
     *  default false
     *  When set to true, RNFirebase will log messages to the console and fire debug events we can listen to in js
     * @usage
     * firebase.on('debug', msg => console.log('Received debug message', msg))
     */
    debug?: boolean;
    /**
     * default false
     * When set to true, database persistence will be enabled.
     */
    persistence?: boolean;
    /**
     * Default from app [NSBundle mainBundle]  The bundle ID for the app to be bundled with
     */
    bundleID?: string;
    /**
     * defualt ""
     * The Google App ID that is used to uniquely identify an instance of an app.
     */
    googleAppID?: string;
    /**
     * deufalt ""
     * The database root (i.e. https://my-app.firebaseio.com)
     */
    databaseURL?: string;
    /**
     * defualt ""
     * URL scheme to set up durable deep link service
     */
    deepLinkURLScheme?: string;
    /**
     * defualt ""
     * The Google Cloud storage bucket name
     */
    storageBucket?: string;
    /**
     * default ""
     * The Android client ID used in Google AppInvite when an iOS app has it's android version
     */
    androidClientID?: string;
    /**
     * default  ""
     * The Project number from the Google Developer's console used to configure Google Cloud Messaging
     */
    GCMSenderID?: string;
    /**
     * default ""
     * The tracking ID for Google Analytics
     */
    trackingID?: string;
    /**
     * default ""
     * The OAuth2 client ID for iOS application used to authenticate Google Users for signing in with Google
     */
    clientID?: string;
    /**
     * defualt ""
     * The secret iOS API key used for authenticating requests from our app
     */
    APIKey?: string
  }

  namespace storage {

    interface StorageTask<T> extends Promise<T> {
      on(event: TaskEvent,
        nextOrObserver: (snapshot: any) => any,
        error: (error: RnError) => any,
        complete: (complete: any) => any): any

      /**
       * is not currently supported by react-native-firebase
       */
      pause(): void

      /**
       * is not currently supported by react-native-firebase
       */
      resume(): void

      /**
       * is not currently supported by react-native-firebase
       */
      cancel(): void

    }

    interface RNStorage extends Reference {
      /**
       *  Downloads a reference to the device
       *  @param {String} filePath Where to store the file
       *  @return {Promise}
       * */
      downloadFile(filePath: string): StorageTask<any>;

      /**
       * Upload a file path
       * @returns {Promise}
       */
      putFile(filePath: string, metadata?: any): StorageTask<any>;

      setMaxDownloadRetryTime(time: number): void

      [key: string]: any;
    }

    interface Storage {
      maxOperationRetryTime: number;
      maxUploadRetryTime: number;

      ref(path?: string): storage.RNStorage;

      refFromURL(url: string): storage.RNStorage;

      setMaxOperationRetryTime(time: number): any;

      setMaxUploadRetryTime(time: number): any;
    }

    interface Reference {
      bucket: string;

      child(path: string): storage.RNStorage;

      delete(): Promise<any>;

      fullPath: string;

      getDownloadURL(): Promise<any>;

      getMetadata(): Promise<any>;

      name: string;
      parent: storage.Reference | null;

      put(data: any | Uint8Array | ArrayBuffer,
        metadata?: storage.UploadMetadata): storage.UploadTask;

      putString(data: string, format?: storage.StringFormat,
        metadata?: storage.UploadMetadata): storage.UploadTask;

      root: storage.Reference;
      storage: storage.Storage;

      toString(): string;

      updateMetadata(metadata: storage.SettableMetadata): Promise<any>;
    }

    interface UploadMetadata extends storage.SettableMetadata {
      md5Hash?: string | null;
    }

    interface SettableMetadata {
      cacheControl?: string | null;
      contentDisposition?: string | null;
      contentEncoding?: string | null;
      contentLanguage?: string | null;
      contentType?: string | null;
      customMetadata?: { [/* warning: coerced from ? */ key: string]: string } | null;
    }

    type StringFormat = string;
    var StringFormat: {
      BASE64: StringFormat,
      BASE64URL: StringFormat,
      DATA_URL: StringFormat,
      RAW: StringFormat,
    }

    interface UploadTask {
      cancel(): boolean;

      catch(onRejected: (a: RnError) => any): Promise<any>;

      on(event: storage.TaskEvent, nextOrObserver?: null | Object,
        error?: ((a: RnError) => any) | null, complete?: (() => any) | null): Function;

      pause(): boolean;

      resume(): boolean;

      snapshot: storage.UploadTaskSnapshot;

      then(onFulfilled?: ((a: storage.UploadTaskSnapshot) => any) | null,
        onRejected?: ((a: RnError) => any) | null): Promise<any>;
    }

    interface UploadTaskSnapshot {
      bytesTransferred: number;
      downloadURL: string | null;
      metadata: storage.FullMetadata;
      ref: storage.Reference;
      state: storage.TaskState;
      task: storage.UploadTask;
      totalBytes: number;
    }

    interface FullMetadata extends storage.UploadMetadata {
      bucket: string;
      downloadURLs: string[];
      fullPath: string;
      generation: string;
      metageneration: string;
      name: string;
      size: number;
      timeCreated: string;
      updated: string;
    }

    type TaskEvent = string;
    var TaskEvent: {
      STATE_CHANGED: TaskEvent,
    };

    type TaskState = string;
    var TaskState: {
      CANCELED: TaskState,
      ERROR: TaskState,
      PAUSED: TaskState,
      RUNNING: TaskState,
      SUCCESS: TaskState,
    };
  }


  namespace database {


    interface Database {
      /**
       * Returns a new firebase reference instance
       * */
      ref(path?: string): RnReference

      /**
       * register listener
       */
      on(path: string, modifiersString: string, modifiers: Array<string>, eventName: string, cb: () => void, errorCb: () => void): any

      /**
       * unregister listener
       */
      off(path: string, modifiersString: string, eventName?: string, origCB?: () => void): any

      /**
       * Removes all event handlers and their native subscriptions
       */
      cleanup(): Promise<any>

      /**
       * connect to firebase backend
       */
      goOnline(): void

      /**
       * disconnect to firebase backend
       */
      goOffline(): void

      [key: string]: any;
    }

    interface RnReference extends Reference {
      keepSynced(bool: boolean): any

      filter(name: string, value: any, key?: string): any;

      [key: string]: any;
    }

    type QueryEventType = "value" | "child_added" | "child_removed" | "child_changed" | "child_moved";
    type QuerySuccessCallback = (snapshot: DataSnapshot, previousChildId?: string | null) => void;
    type QueryErrorCallback = (e: Error) => void;

    interface Query {
      endAt(value: number | string | boolean | null, key?: string): database.Query;

      equalTo(value: number | string | boolean | null, key?: string): database.Query;

      isEqual(other: database.Query | null): boolean;

      limitToFirst(limit: number): database.Query;

      limitToLast(limit: number): database.Query;

      off(eventType?: QueryEventType,
        callback?: QuerySuccessCallback,
        context?: Object): void;

      on(eventType: QueryEventType,
        callback: QuerySuccessCallback,
        cancelCallbackOrContext?: QueryErrorCallback,
        context?: Object): (a: database.DataSnapshot | null, b?: string) => QuerySuccessCallback;

      once(eventType: QueryEventType,
        successCallback?: QuerySuccessCallback,
        failureCallbackOrContext?: QueryErrorCallback,
        context?: Object): Promise<DataSnapshot>;

      orderByChild(path: string): database.Query;

      orderByKey(): database.Query;

      orderByPriority(): database.Query;

      orderByValue(): database.Query;

      ref: database.Reference;

      startAt(value: number | string | boolean | null, key?: string): database.Query;

      toJSON(): Object;

      toString(): string;
    }

    interface DataSnapshot {
      child(path: string): database.DataSnapshot;

      exists(): boolean;

      exportVal(): any;

      forEach(action: (a: database.DataSnapshot) => boolean): boolean;

      getPriority(): string | number | null;

      hasChild(path: string): boolean;

      hasChildren(): boolean;

      key: string | null;

      numChildren(): number;

      ref: database.Reference;

      toJSON(): Object | null;

      val(): any;
    }

    interface ThenableReference<T> extends Promise<T> {
    }

    interface ThenableReference<T> extends Reference {
    }

    interface Reference extends database.Query {
      child(path: string): database.Reference;

      key: string | null;

      onDisconnect(): any;

      parent: database.Reference | null;

      push(value?: any, onComplete?: (a: RnError | null) => any): ThenableReference<any>

      remove(onComplete?: (a: RnError | null) => any): Promise<any>;

      root: database.Reference;

      set(value: any, onComplete?: (a: RnError | null) => any): Promise<any>;

      setPriority(priority: string | number | null,
        onComplete: (a: RnError | null) => any): Promise<any>;

      setWithPriority(newVal: any, newPriority: string | number | null,
        onComplete?: (a: RnError | null) => any): Promise<any>;

      transaction(transactionUpdate: (a: any) => any,
        onComplete?: (a: RnError | null, b: boolean,
          c: database.DataSnapshot | null) => any,
        applyLocally?: boolean): Promise<any>;

      update(values: Object, onComplete?: (a: RnError | null) => any): Promise<any>;
    }
  }

  /**
   * firebase Analytics
   */
  interface Analytics {
    /**Log a custom event with optional params. */
    logEvent(event: string, params?: Object): void

    /** Sets whether analytics collection is enabled for this app on this device. */
    setAnalyticsCollectionEnabled(enabled: boolean): void

    /**
     * Sets the current screen name, which specifies the current visual context in your app.
     * Whilst screenClassOverride is optional,
     * it is recommended it is always sent as your current class name,
     * for example on Android it will always show as 'MainActivity' if not specified.
     */
    setCurrentScreen(screenName: string | null, screenClassOverride?: string): void

    /**
     * Sets the minimum engagement time required before starting a session.
     * The default value is 10000 (10 seconds)
     */
    setMinimumSessionDuration(miliseconds: number): void

    /**
     * Sets the duration of inactivity that terminates the current session.
     * The default value is 1800000 (30 minutes).
     */
    setSessionTimeoutDuration(miliseconds: number): void

    /**
     * Gives a user a uniqiue identificaition.
     * @example
     * const id = firebase.auth().currentUser.uid;
     *
     * firebase.analytics().setUserId(id);
     */
    setUserId(id: string | null): void

    /**
     * Sets a key/value pair of data on the current user.
     */
    setUserProperty(name: string, value: string | null): void;

    [key: string]: any;
  }

  interface User {
    /**
     * The user's display name (if available).
     */
    displayName: string | null
    /**
     * - The user's email address (if available).
     */
    email: string | null
    /**
     * - True if the user's email address has been verified.
     */
    emailVerified: boolean
    /**
     *
     */
    isAnonymous: boolean
    /**
     * - The URL of the user's profile picture (if available).
     */
    photoURL: string | null
    /**
     * - Additional provider-specific information about the user.
     */
    providerData: any | null
    /**
     *  - The authentication provider ID for the current user.
     *  For example, 'facebook.com', or 'google.com'.
     */
    providerId: string | null
    /**
     *  - The user's unique ID.
     */
    uid: string

    /**
     * Delete the current user.
     */
    delete(): Promise<void>

    /**
     * Returns the users authentication token.
     */
    getToken(): Promise<string>

    /**
     * Reauthenticate the current user with credentials:
     */
    reauthenticate(credential: Credential): Promise<void>

    /**
     * Link the user with a 3rd party credential provider.
     */
    linkWithCredential(credential: Credential): Promise<User>

    /**
     * Refreshes the current user.
     */
    reload(): Promise<void>

    /**
     * Sends a verification email to a user.
     * This will Promise reject is the user is anonymous.
     */
    sendEmailVerification(): Promise<void>

    /**
     * Updates the user's email address.
     * See Firebase docs for more information on security & email validation.
     * This will Promise reject is the user is anonymous.
     */
    updateEmail(email: string): Promise<void>

    /**
     * Important: this is a security sensitive operation that requires the user to have recently signed in.
     * If this requirement isn't met, ask the user to authenticate again and then call firebase.User#reauthenticate.
     * This will Promise reject is the user is anonymous.
     */
    updatePassword(password: string): Promise<void>

    /**
     * Updates a user's profile data.
     * Profile data should be an object of fields to update:
     */
    updateProfile(profile: Object): Promise<void>
  }

  /** 3rd party provider Credentials */
  interface Credential {
    provider: string,
    token: string,
    secret: string
  }

  interface ActionCodeInfo {
    email: string,
    error: string,
    fromEmail: string,
    verifyEmail: string,
    recoverEmail: string,
    passwordReset: string
  }

  namespace auth {

    interface Auth {
      /**
       * Returns the current Firebase authentication state.
       */
      authenticated: boolean;
      /**
       * Returns the currently signed-in user (or null). See the User class documentation for further usage.
       */
      currentUser: User | null

      /**
       * Listen for changes in the users auth state (logging in and out).
       * This method returns a unsubscribe function to stop listening to events.
       * Always ensure you unsubscribe from the listener when no longer needed to prevent updates to components no longer in use.
       */
      onAuthStateChanged(nextOrObserver: Object, error?: (a: RnError) => any,
        completed?: () => any): () => any;

      /**
       * We can create a user by calling the createUserWithEmailAndPassword() function.
       * The method accepts two parameters, an email and a password.
       */
      createUserWithEmailAndPassword(email: string, password: string): Promise<User>

      /**
       * To sign a user in with their email and password, use the signInWithEmailAndPassword() function.
       * It accepts two parameters, the user's email and password:
       */
      signInWithEmailAndPassword(email: string, password: string): Promise<User>

      /**
       * Sign an anonymous user.
       * If the user has already signed in, that user will be returned
       */
      signInAnonymously(): Promise<User>

      /**
       * Sign in the user with a 3rd party credential provider.
       * credential requires the following properties:
       */
      signInWithCredential(credential: Credential): Promise<User>

      /**
       * Sign a user in with a self-signed JWT token.
       * To sign a user using a self-signed custom token,
       * use the signInWithCustomToken() function.
       * It accepts one parameter, the custom token:
       */
      signInWithCustomToken(token: string): Promise<User>

      /**
       * Sends a password reset email to the given email address.
       * Unlike the web SDK,
       * the email will contain a password reset link rather than a code.
       */
      sendPasswordResetEmail(email: string): Promise<void>

      /**
       * Completes the password reset process, given a confirmation code and new password.
       */
      confirmPasswordReset(code: string, newPassword: string): Promise<any>

      /**
       * Applies a verification code sent to the user by email or other out-of-band mechanism.
       */
      applyActionCode(code: string): Promise<any>

      /**
       * Checks a verification code sent to the user by email or other out-of-band mechanism.
       */
      checkActionCode(code: string): Promise<ActionCodeInfo>

      /**
       * Completes the password reset process,
       * given a confirmation code and new password.
       */
      signOut(): Promise<void>

      [key: string]: any;
    }
  }

  namespace messaging {

    interface Messaging {
      /**
       * Subscribes the device to a topic.
       */
      subscribeToTopic(topic: string): void

      /**
       * Unsubscribes the device from a topic.
       */
      unsubscribeFromTopic(topic: string): void

      /**
       * When the application has been opened from a notification
       * getInitialNotification is called and the notification payload is returned.
       * Use onMessage for notifications when the app is running.
       */
      getInitialNotification(): Promise<any>

      /**
       * Returns the devices FCM token.
       * This token can be used in the Firebase console to send messages to directly.
       */
      getToken(forceRefresh?: Boolean): Promise<string>

      /**
       * Reset Instance ID and revokes all tokens.
       */
      deleteInstanceId(): Promise<any>

      /**
       * On the event a devices FCM token is refreshed by Google,
       *  the new token is returned in a callback listener.
       */
      onTokenRefresh(listener: (token: string) => any): () => any

      /**
       * On a new message,
       * the payload object is passed to the listener callback.
       * This method is only triggered when the app is running.
       * Use getInitialNotification for notifications which cause the app to open.
       */
      onMessage(listener: (message: any) => any): () => any

      /**
       * Create a local notification from the device itself.
       */
      createLocalNotification(notification: any): any

      /**
       * Schedule a local notification to be shown on the device.
       */
      scheduleLocalNotification(notification: any): any

      /**
       * Returns an array of all currently scheduled notifications.
       * ```
       * firebase.messaging().getScheduledLocalNotifications()
       *   .then((notifications) => {
       *       console.log('Current scheduled notifications: ', notifications);
       *   });
       * ```
       */
      getScheduledLocalNotifications(): Promise<any[]>

      /**
       * Cancels a location notification by ID,
       * or all notifications by *.
       */
      cancelLocalNotification(id: string): void

      /**
       * Removes all delivered notifications from device by ID,
       * or all notifications by *.
       */
      removeDeliveredNotification(id: string): void

      /**
       * IOS
       * Requests app notification permissions in an Alert dialog.
       */
      requestPermissions(): void

      /**
       * Sets the badge number on the iOS app icon.
       */
      setBadgeNumber(value: number): void

      /**
       * Returns the current badge number on the app icon.
       */
      getBadgeNumber(): Promise<number>

      /**
       * Send an upstream message
       * @param senderId
       * @param payload
       */
      send(senderId: string, payload: RemoteMessage): any

      NOTIFICATION_TYPE: Object
      REMOTE_NOTIFICATION_RESULT: Object
      WILL_PRESENT_RESULT: Object
      EVENT_TYPE: Object
    }

    interface RemoteMessage {
      id: string,
      type: string,
      ttl?: number,
      sender: string,
      collapseKey?: string,
      data: Object,
    }
  }

  namespace crash {

    interface Crash {
      /** Logs a message that will appear in a subsequent crash report. */
      log(message: string): void

      /**
       * Android: Logs a message that will appear in a subsequent crash report as well as in logcat.
       * iOS: Logs the message in the subsequest crash report only (same as log).
       */
      logcat(level: number, tag: string, message: string): void

      /**
       * Files a crash report, along with any previous logs to Firebase.
       * An Error object must be passed into the report method.
       */
      report(error: RnError, maxStackSize: Number): void

      [key: string]: any;
    }
  }
}

declare module "react-native-firebase" {
  const _default: FireBase;
  export default _default;

}

import React from 'react';
export declare class AdMobComponent extends React.Component {
  static propTypes: {};
  static defaultProps: {
      request: any;
      video: any;
  };
  constructor(props: any);
  /**
   * Handle a single banner event and pass to
   * any props watching it
   * @param nativeEvent
   */
  onBannerEvent: ({ nativeEvent }: {
      nativeEvent: any;
  }) => void;
  /**
   * Set the JS size of the loaded banner
   * @param width
   * @param height
   */
  updateSize: ({ width, height }: {
      width: any;
      height: any;
  }) => void;
  /**
   * Render the native component
   * @returns {XML}
   */
  render(): any;
}
export declare class AdRequest {
  constructor();
  build(): any;
  addTestDevice(deviceId: any): AdRequest;
  addKeyword(keyword: any): AdRequest;
  setBirthday(): void;
  setContentUrl(url: any): AdRequest;
  setGender(gender: any): AdRequest;
  setLocation(): void;
  setRequestAgent(requestAgent: any): AdRequest;
  setIsDesignedForFamilies(isDesignedForFamilies: any): AdRequest;
  tagForChildDirectedTreatment(tagForChildDirectedTreatment: any): AdRequest;
}
declare function Banner({}: {}, ...props: any[]): AdMobComponent;

declare var _default: {
  onAdLoaded: string;
  onAdOpened: string;
  onAdLeftApplication: string;
  onAdClosed: string;
  onAdFailedToLoad: string;
};

export declare const NativeExpressEventTypes: {
  onVideoEnd: string;
  onVideoMute: string;
  onVideoPause: string;
  onVideoPlay: string;
  onVideoStart: string;
};
export declare const RewardedVideoEventTypes: {
  onRewarded: string;
  onRewardedVideoStarted: string;
};
export class Interstitial {
  constructor(admob: any, adUnit: any);
  /**
   * Handle a JS emit event
   * @param event
   * @private
   */
  _onInterstitialEvent: (event: any) => void;
  /**
   * Load an ad with an instance of AdRequest
   * @param request
   * @returns {*}
   */
  loadAd(request: any): any;
  /**
   * Return a local instance of isLoaded
   * @returns {boolean}
   */
  isLoaded(): any;
  /**
   * Show the advert - will only show if loaded
   * @returns {*}
   */
  show(): void;
  /**
   * Listen to an Ad event
   * @param eventType
   * @param listenerCb
   * @returns {null}
   */
  on(eventType: any, listenerCb: any): any;
}
declare function NativeExpress({}: {}, ...props: any[]): AdMobComponent;

export class RewardedVideo {
  constructor(admob: any, adUnit: any);
  /**
   * Handle a JS emit event
   * @param event
   * @private
   */
  _onRewardedVideoEvent: (event: any) => void;
  /**
   * Load an ad with an instance of AdRequest
   * @param request
   * @returns {*}
   */
  loadAd(request: any): any;
  /**
   * Return a local instance of isLoaded
   * @returns {boolean}
   */
  isLoaded(): any;
  /**
   * Show the advert - will only show if loaded
   * @returns {*}
   */
  show(): void;
  /**
   * Listen to an Ad event
   * @param eventType
   * @param listenerCb
   * @returns {null}
   */
  on(eventType: any, listenerCb: any): void;
  if(): any;
}
export declare class VideoOptions {
  constructor();
  build(): any;
  setStartMuted(muted?: boolean): VideoOptions;
}

/**
 *
 * Analytics representation wrapper
 */
 declare class Analytics {
    constructor(firebaseApp: any, options?: {});
    /**
     * Logs an app event.
     * @param  {string} name
     * @param params
     * @return {Promise}
     */
    logEvent(name: any, params?: {}): void;
    /**
     * Sets whether analytics collection is enabled for this app on this device.
     * @param enabled
     */
    setAnalyticsCollectionEnabled(enabled: any): void;
    /**
     * Sets the current screen name, which specifies the current visual context in your app.
     * @param screenName
     * @param screenClassOverride
     */
    setCurrentScreen(screenName: any, screenClassOverride: any): void;
    /**
     * Sets the minimum engagement time required before starting a session. The default value is 10000 (10 seconds).
     * @param milliseconds
     */
    setMinimumSessionDuration(milliseconds?: number): void;
    /**
     * Sets the duration of inactivity that terminates the current session. The default value is 1800000 (30 minutes).
     * @param milliseconds
     */
    setSessionTimeoutDuration(milliseconds?: number): void;
    /**
     * Sets the user ID property.
     * @param id
     */
    setUserId(id: any): void;
    /**
     * Sets a user property to a given value.
     * @param name
     * @param value
     */
    setUserProperty(name: any, value: any): void;
    /**
     * Sets a user property to a given value.
     * @RNFirebaseSpecific
     * @param object
     */
    setUserProperties(object: any): void;
}

declare class Auth  {
  static _NAMESPACE: string;
  static _NATIVE_MODULE: string;
  constructor(firebaseApp: any, options?: {});
  /**
   * Route a phone state change event to the correct listeners
   * @param event
   * @private
   */
  _onInternalPhoneAuthStateChanged(event: any): void;
  _setAuthState(auth: any): void;
  /**
   * Internal auth changed listener
   * @param auth
   * @private
   */
  _onInternalAuthStateChanged(auth: any): void;
  /**
   * Internal auth changed listener
   * @param auth
   * @param emit
   * @private
   */
  _onInternalIdTokenChanged(auth: any): void;
  /**
   * Intercept all user actions and send their results to
   * auth state change before resolving
   * @param promise
   * @returns {Promise.<*>}
   * @private
   */
  _interceptUserValue(promise: any): any;
  _interceptUndefinedUserValue(promise: any): any;
  /**
   * Listen for auth changes.
   * @param listener
   */
  onAuthStateChanged(listener: any): any;
  /**
   * Remove auth change listener
   * @param listener
   */
  _offAuthStateChanged(listener: any): void;
  /**
   * Listen for id token changes.
   * @param listener
   */
  onIdTokenChanged(listener: any): any;
  /**
   * Remove id token change listener
   * @param listener
   */
  _offIdTokenChanged(listener: any): void;
  /**
   * Listen for user changes.
   * @param listener
   */
  onUserChanged(listener: any): any;
  /**
   * Remove user change listener
   * @param listener
   */
  _offUserChanged(listener: any): void;
  /**
   * Sign the current user out
   * @return {Promise}
   */
  signOut(): any;
  /**
   * Sign a user in anonymously
   * @return {Promise} A promise resolved upon completion
   */
  signInAnonymously(): any;
  /**
   * Create a user with the email/password functionality
   * @param  {string} email    The user's email
   * @param  {string} password The user's password
   * @return {Promise}         A promise indicating the completion
   */
  createUserWithEmailAndPassword(email: any, password: any): any;
  /**
   * Sign a user in with email/password
   * @param  {string} email    The user's email
   * @param  {string} password The user's password
   * @return {Promise}         A promise that is resolved upon completion
   */
  signInWithEmailAndPassword(email: any, password: any): any;
  /**
   * Sign the user in with a custom auth token
   * @param  {string} customToken  A self-signed custom auth token.
   * @return {Promise}             A promise resolved upon completion
   */
  signInWithCustomToken(customToken: any): any;
  /**
   * Sign the user in with a third-party authentication provider
   * @return {Promise}           A promise resolved upon completion
   */
  signInWithCredential(credential: any): any;
  /**
   * Asynchronously signs in using a phone number.
   *
   */
  signInWithPhoneNumber(phoneNumber: any): any;
  /**
   * Returns a PhoneAuthListener to listen to phone verification events,
   * on the final completion event a PhoneAuthCredential can be generated for
   * authentication purposes.
   *
   * @param phoneNumber
   * @param autoVerifyTimeout Android Only
   * @returns {PhoneAuthListener}
   */
  verifyPhoneNumber(phoneNumber: any, autoVerifyTimeout: any): PhoneAuthListener;
  /**
   * Send reset password instructions via email
   * @param {string} email The email to send password reset instructions
   */
  sendPasswordResetEmail(email: any): any;
  /**
   * Completes the password reset process, given a confirmation code and new password.
   *
   * @link https://firebase.google.com/docs/reference/js/firebase.auth.Auth#confirmPasswordReset
   * @param code
   * @param newPassword
   * @return {Promise.<Null>}
   */
  confirmPasswordReset(code: any, newPassword: any): any;
  /**
   * Applies a verification code sent to the user by email or other out-of-band mechanism.
   *
   * @link https://firebase.google.com/docs/reference/js/firebase.auth.Auth#applyActionCode
   * @param code
   * @return {Promise.<Null>}
   */
  applyActionCode(code: any): any;
  /**
   * Checks a verification code sent to the user by email or other out-of-band mechanism.
   *
   * @link https://firebase.google.com/docs/reference/js/firebase.auth.Auth#checkActionCode
   * @param code
   * @return {Promise.<any>|Promise<ActionCodeInfo>}
   */
  checkActionCode(code: any): any;
  /**
   * Get the currently signed in user
   * @return {Promise}
   */
  getCurrentUser(): any;
  /**
   * Returns a list of authentication providers that can be used to sign in a given user (identified by its main email address).
   * @return {Promise}
   */
  fetchProvidersForEmail(email: any): any;
  /**
   * Get the currently signed in user
   * @return {Promise}
   */
  currentUser: any;
  namespace: string;
  /**
   * KNOWN UNSUPPORTED METHODS
   */
  getRedirectResult(): void;
  setPersistence(): void;
  signInAndRetrieveDataWithCredential(): void;
  signInWithPopup(): void;
  signInWithRedirect(): void;
}
export declare const statics: {
  EmailAuthProvider: any;
  PhoneAuthProvider: any;
  GoogleAuthProvider: any;
  GithubAuthProvider: any;
  TwitterAuthProvider: any;
  FacebookAuthProvider: any;
  PhoneAuthState: {
      CODE_SENT: string;
      AUTO_VERIFY_TIMEOUT: string;
      AUTO_VERIFIED: string;
      ERROR: string;
  };
};
/**
*
* ConfirmationResult representation wrapper
*/
export declare class ConfirmationResult {
  /**
   *
   * @param auth
   * @param verificationId The phone number authentication operation's verification ID.
   */
  constructor(auth: any, verificationId: any);
  /**
   *
   * @param verificationCode
   * @return {*}
   */
  confirm(verificationCode: any): any;
  verificationId: any;
}
export declare class PhoneAuthListener {
  /**
   *
   * @param auth
   * @param phoneNumber
   * @param timeout
   */
  constructor(auth: any, phoneNumber: any, timeout: any);
 
  on(event: any, observer: any, errorCb: any, successCb: any): PhoneAuthListener;
  /**
   * Promise .then proxy
   * @param fn
   */
  then(fn: any): any;
  /**
   * Promise .catch proxy
   * @param fn
   */
  catch(fn: any): any;
}
export declare class User {
  /**
   *
   * @param auth Instance of Authentication class
   * @param user user result object from native
   */
  constructor(auth: any, user: any);
  /**
   * PROPERTIES
   */
  displayName: any;
  email: any;
  emailVerified: any;
  isAnonymous: any;
  phoneNumber: any;
  photoURL: any;
  providerData: any;
  providerId: any;
  uid: any;
  /**
   * METHODS
   */
  /**
   * Delete the current user
   * @return {Promise}
   */
  delete(): any;
  /**
   * get the token of current user
   * @return {Promise}
   */
  getIdToken(forceRefresh?: boolean): any;
  /**
   *
   * @param credential
   */
  linkWithCredential(credential: any): any;
  /**
   * Re-authenticate a user with a third-party authentication provider
   * @return {Promise}         A promise resolved upon completion
   */
  reauthenticateWithCredential(credential: any): any;
  /**
   * Reload the current user
   * @return {Promise}
   */
  reload(): any;
  /**
   * Send verification email to current user.
   */
  sendEmailVerification(): any;
  toJSON(): any;
  /**
   *
   * @param providerId
   * @return {Promise.<TResult>|*}
   */
  unlink(providerId: any): any;
  /**
   * Update the current user's email
   *
   * @param  {string} email The user's _new_ email
   * @return {Promise}       A promise resolved upon completion
   */
  updateEmail(email: any): any;
  /**
   * Update the current user's password
   * @param  {string} password the new password
   * @return {Promise}
   */
  updatePassword(password: any): any;
  /**
   * Update the current user's profile
   * @param  {Object} updates An object containing the keys listed [here](https://firebase.google.com/docs/auth/ios/manage-users#update_a_users_profile)
   * @return {Promise}
   */
  updateProfile(updates?: {}): any;
  /**
   * get the token of current user
   * @deprecated Deprecated getToken in favor of getIdToken.
   * @return {Promise}
   */
  getToken(forceRefresh?: boolean): any;
  /**
   * KNOWN UNSUPPORTED METHODS
   */
  linkAndRetrieveDataWithCredential(): void;
  linkWithPhoneNumber(): void;
  linkWithPopup(): void;
  linkWithRedirect(): void;
  reauthenticateWithPhoneNumber(): void;
  reauthenticateWithPopup(): void;
  reauthenticateWithRedirect(): void;
  updatePhoneNumber(): void;
  refreshToken: void;
}

declare namespace firestore {
  /**
   * Document data (for use with `DocumentReference.set()`) consists of fields
   * mapped to values.
   */
  export type DocumentData = { [field: string]: any };

  /**
   * Update data (for use with `DocumentReference.update()`) consists of field
   * paths (e.g. 'foo' or 'foo.baz') mapped to values. Fields that contain dots
   * reference nested fields within the document.
   */
  export type UpdateData = { [fieldPath: string]: any };

  /** Settings used to configure a `Firestore` instance. */
  export interface Settings {
    /** The hostname to connect to. */
    host?: string;
    /** Whether to use SSL when connecting. */
    ssl?: boolean;
  }

  export type LogLevel = 'debug' | 'error' | 'silent';

  function setLogLevel(logLevel: LogLevel): void;

  /**
   * `Firestore` represents a Firestore Database and is the entry point for all
   * Firestore operations.
   */
  export class Firestore {
    private constructor();

    /**
     * Specifies custom settings to be used to configure the `Firestore`
     * instance. Must be set before invoking any other methods.
     *
     * @param settings The settings to use.
     */
    settings(settings: Settings): void;

    /**
     * Attempts to enable persistent storage, if possible.
     *
     * Must be called before any other methods (other than settings()).
     *
     * If this fails, enablePersistence() will reject the promise it returns.
     * Note that even after this failure, the firestore instance will remain
     * usable, however offline persistence will be disabled.
     *
     * There are several reasons why this can fail, which can be identified by
     * the `code` on the error.
     *
     *   * failed-precondition: The app is already open in another browser tab.
     *   * unimplemented: The browser is incompatible with the offline
     *     persistence implementation.
     *
     * @return A promise that represents successfully enabling persistent
     * storage.
     */
    enablePersistence(): Promise<void>;

    /**
     * Gets a `CollectionReference` instance that refers to the collection at
     * the specified path.
     *
     * @param collectionPath A slash-separated path to a collection.
     * @return The `CollectionReference` instance.
     */
    collection(collectionPath: string): CollectionReference;

    /**
     * Gets a `DocumentReference` instance that refers to the document at the
     * specified path.
     *
     * @param documentPath A slash-separated path to a document.
     * @return The `DocumentReference` instance.
     */
    doc(documentPath: string): DocumentReference;

    /**
     * Executes the given updateFunction and then attempts to commit the
     * changes applied within the transaction. If any document read within the
     * transaction has changed, the updateFunction will be retried. If it fails
     * to commit after 5 attempts, the transaction will fail.
     *
     * @param updateFunction The function to execute within the transaction
     * context.
     * @return If the transaction completed successfully or was explicitly
     * aborted (by the updateFunction returning a failed Promise), the Promise
     * returned by the updateFunction will be returned here. Else if the
     * transaction failed, a rejected Promise with the corresponding failure
     * error will be returned.
     */
    runTransaction<T>(
      updateFunction: (transaction: Transaction) => Promise<T>
    ): Promise<T>;

    /**
     * Creates a write batch, used for performing multiple writes as a single
     * atomic operation.
     */
    batch(): WriteBatch;

    /**
     * The `firebase.app.App` associated with this `Firestore` instance.
     */
    app: firebase.app.App;

    INTERNAL: { delete: () => Promise<void> };
  }

  /**
   * An immutable object representing a geo point in Firestore. The geo point
   * is represented as latitude/longitude pair.
   *
   * Latitude values are in the range of [-90, 90].
   * Longitude values are in the range of [-180, 180].
   */
  export class GeoPoint {
    /**
     * Creates a new immutable GeoPoint object with the provided latitude and
     * longitude values.
     * @param latitude The latitude as number between -90 and 90.
     * @param longitude The longitude as number between -180 and 180.
     */
    constructor(latitude: number, longitude: number);

    readonly latitude: number;
    readonly longitude: number;
  }

  /**
   * An immutable object representing an array of bytes.
   */
  export class Blob {
    private constructor();

    /**
     * Creates a new Blob from the given Base64 string, converting it to
     * bytes.
     */
    static fromBase64String(base64: string): Blob;

    /**
     * Creates a new Blob from the given Uint8Array.
     */
    static fromUint8Array(array: Uint8Array): Blob;

    /**
     * Returns the bytes of this Blob as a Base64-encoded string.
     */
    public toBase64(): string;

    /**
     * Returns the bytes of this Blob in a new Uint8Array.
     */
    public toUint8Array(): Uint8Array;
  }

  /**
   * A reference to a transaction.
   * The `Transaction` object passed to a transaction's updateFunction provides
   * the methods to read and write data within the transaction context. See
   * `Firestore.runTransaction()`.
   */
  export class Transaction {
    private constructor();

    /**
     * Reads the document referenced by the provided `DocumentReference.`
     *
     * @param documentRef A reference to the document to be read.
     * @return A DocumentSnapshot for the read data.
     */
    get(documentRef: DocumentReference): Promise<DocumentSnapshot>;

    /**
     * Writes to the document referred to by the provided `DocumentReference`.
     * If the document does not exist yet, it will be created. If you pass
     * `SetOptions`, the provided data can be merged into the existing document.
     *
     * @param documentRef A reference to the document to be set.
     * @param data An object of the fields and values for the document.
     * @param options An object to configure the set behavior.
     * @return This `Transaction` instance. Used for chaining method calls.
     */
    set(
      documentRef: DocumentReference,
      data: DocumentData,
      options?: SetOptions
    ): Transaction;

    /**
     * Updates fields in the document referred to by the provided
     * `DocumentReference`. The update will fail if applied to a document that
     * does not exist.
     *
     * @param documentRef A reference to the document to be updated.
     * @param data An object containing the fields and values with which to
     * update the document. Fields can contain dots to reference nested fields
     * within the document.
     * @return This `Transaction` instance. Used for chaining method calls.
     */
    update(documentRef: DocumentReference, data: UpdateData): Transaction;

    /**
     * Updates fields in the document referred to by the provided
     * `DocumentReference`. The update will fail if applied to a document that
     * does not exist.
     *
     * Nested fields can be updated by providing dot-separated field path
     * strings or by providing FieldPath objects.
     *
     * @param documentRef A reference to the document to be updated.
     * @param field The first field to update.
     * @param value The first value.
     * @param moreFieldsAndValues Additional key/value pairs.
     * @return A Promise resolved once the data has been successfully written
     * to the backend (Note that it won't resolve while you're offline).
     */
    update(
      documentRef: DocumentReference,
      field: string | FieldPath,
      value: any,
      ...moreFieldsAndValues: any[]
    ): Transaction;

    /**
     * Deletes the document referred to by the provided `DocumentReference`.
     *
     * @param documentRef A reference to the document to be deleted.
     * @return This `Transaction` instance. Used for chaining method calls.
     */
    delete(documentRef: DocumentReference): Transaction;
  }

  /**
   * A write batch, used to perform multiple writes as a single atomic unit.
   *
   * A `WriteBatch` object can be acquired by calling `Firestore.batch()`. It
   * provides methods for adding writes to the write batch. None of the
   * writes will be committed (or visible locally) until `WriteBatch.commit()`
   * is called.
   *
   * Unlike transactions, write batches are persisted offline and therefore are
   * preferable when you don't need to condition your writes on read data.
   */
  export class WriteBatch {
    private constructor();

    /**
     * Writes to the document referred to by the provided `DocumentReference`.
     * If the document does not exist yet, it will be created. If you pass
     * `SetOptions`, the provided data can be merged into the existing document.
     *
     * @param documentRef A reference to the document to be set.
     * @param data An object of the fields and values for the document.
     * @param options An object to configure the set behavior.
     * @return This `WriteBatch` instance. Used for chaining method calls.
     */
    set(
      documentRef: DocumentReference,
      data: DocumentData,
      options?: SetOptions
    ): WriteBatch;

    /**
     * Updates fields in the document referred to by the provided
     * `DocumentReference`. The update will fail if applied to a document that
     * does not exist.
     *
     * @param documentRef A reference to the document to be updated.
     * @param data An object containing the fields and values with which to
     * update the document. Fields can contain dots to reference nested fields
     * within the document.
     * @return This `WriteBatch` instance. Used for chaining method calls.
     */
    update(documentRef: DocumentReference, data: UpdateData): WriteBatch;

    /**
     * Updates fields in the document referred to by this `DocumentReference`.
     * The update will fail if applied to a document that does not exist.
     *
     * Nested fields can be update by providing dot-separated field path strings
     * or by providing FieldPath objects.
     *
     * @param documentRef A reference to the document to be updated.
     * @param field The first field to update.
     * @param value The first value.
     * @param moreFieldsAndValues Additional key value pairs.
     * @return A Promise resolved once the data has been successfully written
     * to the backend (Note that it won't resolve while you're offline).
     */
    update(
      documentRef: DocumentReference,
      field: string | FieldPath,
      value: any,
      ...moreFieldsAndValues: any[]
    ): WriteBatch;

    /**
     * Deletes the document referred to by the provided `DocumentReference`.
     *
     * @param documentRef A reference to the document to be deleted.
     * @return This `WriteBatch` instance. Used for chaining method calls.
     */
    delete(documentRef: DocumentReference): WriteBatch;

    /**
     * Commits all of the writes in this write batch as a single atomic unit.
     *
     * @return A Promise resolved once all of the writes in the batch have been
     * successfully written to the backend as an atomic unit. Note that it won't
     * resolve while you're offline.
     */
    commit(): Promise<void>;
  }

  /**
   * Options for use with `DocumentReference.onSnapshot()` to control the
   * behavior of the snapshot listener.
   */
  export interface DocumentListenOptions {
    /**
     * Raise an event even if only metadata of the document changed. Default is
     * false.
     */
    readonly includeMetadataChanges?: boolean;
  }

  /**
   * An options object that configures the behavior of `set()` calls in
   * `DocumentReference`, `WriteBatch` and `Transaction`. These calls can be
   * configured to perform granular merges instead of overwriting the target
   * documents in their entirety by providing a `SetOptions` with `merge: true`.
   */
  export interface SetOptions {
    /**
     * Changes the behavior of a set() call to only replace the values specified
     * in its data argument. Fields omitted from the set() call remain
     * untouched.
     */
    readonly merge?: boolean;
  }

  /**
   * A `DocumentReference` refers to a document location in a Firestore database
   * and can be used to write, read, or listen to the location. The document at
   * the referenced location may or may not exist. A `DocumentReference` can
   * also be used to create a `CollectionReference` to a subcollection.
   */
  export class DocumentReference {
    private constructor();

    /** The identifier of the document within its collection. */
    readonly id: string;

    /**
     * The `Firestore` for the Firestore database (useful for performing
     * transactions, etc.).
     */
    readonly firestore: Firestore;

    /**
     * A reference to the Collection to which this DocumentReference belongs.
     */
    readonly parent: CollectionReference;

    /**
     * A string representing the path of the referenced document (relative
     * to the root of the database).
     */
    readonly path: string;

    /**
     * Gets a `CollectionReference` instance that refers to the collection at
     * the specified path.
     *
     * @param collectionPath A slash-separated path to a collection.
     * @return The `CollectionReference` instance.
     */
    collection(collectionPath: string): CollectionReference;

    /**
     * Returns true if this `DocumentReference` is equal to the provided one.
     *
     * @param other The `DocumentReference` to compare against.
     * @return true if this `DocumentReference` is equal to the provided one.
     */
    isEqual(other: DocumentReference): boolean;

    /**
     * Writes to the document referred to by this `DocumentReference`. If the
     * document does not yet exist, it will be created. If you pass
     * `SetOptions`, the provided data can be merged into an existing document.
     *
     * @param data A map of the fields and values for the document.
     * @param options An object to configure the set behavior.
     * @return A Promise resolved once the data has been successfully written
     * to the backend (Note that it won't resolve while you're offline).
     */
    set(data: DocumentData, options?: SetOptions): Promise<void>;

    /**
     * Updates fields in the document referred to by this `DocumentReference`.
     * The update will fail if applied to a document that does not exist.
     *
     * @param data An object containing the fields and values with which to
     * update the document. Fields can contain dots to reference nested fields
     * within the document.
     * @return A Promise resolved once the data has been successfully written
     * to the backend (Note that it won't resolve while you're offline).
     */
    update(data: UpdateData): Promise<void>;

    /**
     * Updates fields in the document referred to by this `DocumentReference`.
     * The update will fail if applied to a document that does not exist.
     *
     * Nested fields can be updated by providing dot-separated field path
     * strings or by providing FieldPath objects.
     *
     * @param field The first field to update.
     * @param value The first value.
     * @param moreFieldsAndValues Additional key value pairs.
     * @return A Promise resolved once the data has been successfully written
     * to the backend (Note that it won't resolve while you're offline).
     */
    update(
      field: string | FieldPath,
      value: any,
      ...moreFieldsAndValues: any[]
    ): Promise<void>;

    /**
     * Deletes the document referred to by this `DocumentReference`.
     *
     * @return A Promise resolved once the document has been successfully
     * deleted from the backend (Note that it won't resolve while you're
     * offline).
     */
    delete(): Promise<void>;

    /**
     * Reads the document referred to by this `DocumentReference`.
     *
     * Note: get() attempts to provide up-to-date data when possible by waiting
     * for data from the server, but it may return cached data or fail if you
     * are offline and the server cannot be reached.
     *
     * @return A Promise resolved with a DocumentSnapshot containing the
     * current document contents.
     */
    get(): Promise<DocumentSnapshot>;

    /**
     * Attaches a listener for DocumentSnapshot events. You may either pass
     * individual `onNext` and `onError` callbacks or pass a single observer
     * object with `next` and `error` callbacks.
     *
     * NOTE: Although an `onCompletion` callback can be provided, it will
     * never be called because the snapshot stream is never-ending.
     *
     * @param options Options controlling the listen behavior.
     * @param onNext A callback to be called every time a new `DocumentSnapshot`
     * is available.
     * @param onError A callback to be called if the listen fails or is
     * cancelled. No further callbacks will occur.
     * @param observer A single object containing `next` and `error` callbacks.
     * @return An unsubscribe function that can be called to cancel
     * the snapshot listener.
     */
    onSnapshot(observer: {
      next?: (snapshot: DocumentSnapshot) => void;
      error?: (error: FirestoreError) => void;
      complete?: () => void;
    }): () => void;
    onSnapshot(
      options: DocumentListenOptions,
      observer: {
        next?: (snapshot: DocumentSnapshot) => void;
        error?: (error: Error) => void;
        complete?: () => void;
      }
    ): () => void;
    onSnapshot(
      onNext: (snapshot: DocumentSnapshot) => void,
      onError?: (error: Error) => void,
      onCompletion?: () => void
    ): () => void;
    onSnapshot(
      options: DocumentListenOptions,
      onNext: (snapshot: DocumentSnapshot) => void,
      onError?: (error: Error) => void,
      onCompletion?: () => void
    ): () => void;
  }

  /** Metadata about a snapshot, describing the state of the snapshot. */
  export interface SnapshotMetadata {
    /**
     * True if the snapshot contains the result of local writes (e.g. set() or
     * update() calls) that have not yet been committed to the backend.
     * If your listener has opted into metadata updates (via
     * `DocumentListenOptions` or `QueryListenOptions`) you will receive another
     * snapshot with `hasPendingWrites` equal to false once the writes have been
     * committed to the backend.
     */
    readonly hasPendingWrites: boolean;

    /**
     * True if the snapshot was created from cached data rather than
     * guaranteed up-to-date server data. If your listener has opted into
     * metadata updates (via `DocumentListenOptions` or `QueryListenOptions`)
     * you will receive another snapshot with `fromCache` equal to false once
     * the client has received up-to-date data from the backend.
     */
    readonly fromCache: boolean;
  }

  /**
   * A `DocumentSnapshot` contains data read from a document in your Firestore
   * database. The data can be extracted with `.data()` or `.get(<field>)` to
   * get a specific field.
   */
  export class DocumentSnapshot {
    private constructor();

    /** True if the document exists. */
    readonly exists: boolean;
    /** A `DocumentReference` to the document location. */
    readonly ref: DocumentReference;
    /**
     * The ID of the document for which this `DocumentSnapshot` contains data.
     */
    readonly id: string;
    /**
     * Metadata about this snapshot, concerning its source and if it has local
     * modifications.
     */
    readonly metadata: SnapshotMetadata;

    /**
     * Retrieves all fields in the document as an Object.
     *
     * @return An Object containing all fields in the document.
     */
    data(): DocumentData;

    /**
     * Retrieves the field specified by `fieldPath`.
     *
     * @param fieldPath The path (e.g. 'foo' or 'foo.bar') to a specific field.
     * @return The data at the specified field location or undefined if no such
     * field exists in the document.
     */
    get(fieldPath: string | FieldPath): any;
  }

  /**
   * The direction of a `Query.orderBy()` clause is specified as 'desc' or 'asc'
   * (descending or ascending).
   */
  export type OrderByDirection = 'desc' | 'asc';

  /**
   * Filter conditions in a `Query.where()` clause are specified using the
   * strings '<', '<=', '==', '>=', and '>'.
   */
  export type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>';

  /**
   * Options for use with `Query.onSnapshot() to control the behavior of the
   * snapshot listener.
   */
  export interface QueryListenOptions {
    /**
     * Raise an event even if only metadata changes (i.e. one of the
     * `QuerySnapshot.metadata` properties). Default is false.
     */
    readonly includeQueryMetadataChanges?: boolean;

    /**
     * Raise an event even if only metadata of a document in the query results
     * changes (i.e. one of the `DocumentSnapshot.metadata` properties on one of
     * the documents). Default is false.
     */
    readonly includeDocumentMetadataChanges?: boolean;
  }

  /**
   * A `Query` refers to a Query which you can read or listen to. You can also
   * construct refined `Query` objects by adding filters and ordering.
   */
  export class Query {
    protected constructor();

    /**
     * The `Firestore` for the Firestore database (useful for performing
     * transactions, etc.).
     */
    readonly firestore: Firestore;

    /**
     * Creates and returns a new Query with the additional filter that documents
     * must contain the specified field and the value should satisfy the
     * relation constraint provided.
     *
     * @param fieldPath The path to compare
     * @param opStr The operation string (e.g "<", "<=", "==", ">", ">=").
     * @param value The value for comparison
     * @return The created Query.
     */
    where(
      fieldPath: string | FieldPath,
      opStr: WhereFilterOp,
      value: any
    ): Query;

    /**
     * Creates and returns a new Query that's additionally sorted by the
     * specified field, optionally in descending order instead of ascending.
     *
     * @param fieldPath The field to sort by.
     * @param directionStr Optional direction to sort by ('asc' or 'desc'). If
     * not specified, order will be ascending.
     * @return The created Query.
     */
    orderBy(
      fieldPath: string | FieldPath,
      directionStr?: OrderByDirection
    ): Query;

    /**
     * Creates and returns a new Query that's additionally limited to only
     * return up to the specified number of documents.
     *
     * @param limit The maximum number of items to return.
     * @return The created Query.
     */
    limit(limit: number): Query;

    /**
     * Creates and returns a new Query that starts at the provided document
     * (inclusive). The starting position is relative to the order of the query.
     * The document must contain all of the fields provided in the orderBy of
     * this query.
     *
     * @param snapshot The snapshot of the document to start at.
     * @return The created Query.
     */
    startAt(snapshot: DocumentSnapshot): Query;

    /**
     * Creates and returns a new Query that starts at the provided fields
     * relative to the order of the query. The order of the field values
     * must match the order of the order by clauses of the query.
     *
     * @param fieldValues The field values to start this query at, in order
     * of the query's order by.
     * @return The created Query.
     */
    startAt(...fieldValues: any[]): Query;

    /**
     * Creates and returns a new Query that starts after the provided document
     * (exclusive). The starting position is relative to the order of the query.
     * The document must contain all of the fields provided in the orderBy of
     * this query.
     *
     * @param snapshot The snapshot of the document to start after.
     * @return The created Query.
     */
    startAfter(snapshot: DocumentSnapshot): Query;

    /**
     * Creates and returns a new Query that starts after the provided fields
     * relative to the order of the query. The order of the field values
     * must match the order of the order by clauses of the query.
     *
     * @param fieldValues The field values to start this query after, in order
     * of the query's order by.
     * @return The created Query.
     */
    startAfter(...fieldValues: any[]): Query;

    /**
     * Creates and returns a new Query that ends before the provided document
     * (exclusive). The end position is relative to the order of the query. The
     * document must contain all of the fields provided in the orderBy of this
     * query.
     *
     * @param snapshot The snapshot of the document to end before.
     * @return The created Query.
     */
    endBefore(snapshot: DocumentSnapshot): Query;

    /**
     * Creates and returns a new Query that ends before the provided fields
     * relative to the order of the query. The order of the field values
     * must match the order of the order by clauses of the query.
     *
     * @param fieldValues The field values to end this query before, in order
     * of the query's order by.
     * @return The created Query.
     */
    endBefore(...fieldValues: any[]): Query;

    /**
     * Creates and returns a new Query that ends at the provided document
     * (inclusive). The end position is relative to the order of the query. The
     * document must contain all of the fields provided in the orderBy of this
     * query.
     *
     * @param snapshot The snapshot of the document to end at.
     * @return The created Query.
     */
    endAt(snapshot: DocumentSnapshot): Query;

    /**
     * Creates and returns a new Query that ends at the provided fields
     * relative to the order of the query. The order of the field values
     * must match the order of the order by clauses of the query.
     *
     * @param fieldValues The field values to end this query at, in order
     * of the query's order by.
     * @return The created Query.
     */
    endAt(...fieldValues: any[]): Query;

    /**
     * Returns true if this `Query` is equal to the provided one.
     *
     * @param other The `Query` to compare against.
     * @return true if this `Query` is equal to the provided one.
     */
    isEqual(other: Query): boolean;

    /**
     * Executes the query and returns the results as a QuerySnapshot.
     *
     * @return A Promise that will be resolved with the results of the Query.
     */
    get(): Promise<QuerySnapshot>;

    /**
     * Attaches a listener for QuerySnapshot events. You may either pass
     * individual `onNext` and `onError` callbacks or pass a single observer
     * object with `next` and `error` callbacks.
     *
     * NOTE: Although an `onCompletion` callback can be provided, it will
     * never be called because the snapshot stream is never-ending.
     *
     * @param options Options controlling the listen behavior.
     * @param onNext A callback to be called every time a new `QuerySnapshot`
     * is available.
     * @param onError A callback to be called if the listen fails or is
     * cancelled. No further callbacks will occur.
     * @param observer A single object containing `next` and `error` callbacks.
     * @return An unsubscribe function that can be called to cancel
     * the snapshot listener.
     */
    onSnapshot(observer: {
      next?: (snapshot: QuerySnapshot) => void;
      error?: (error: Error) => void;
      complete?: () => void;
    }): () => void;
    onSnapshot(
      options: QueryListenOptions,
      observer: {
        next?: (snapshot: QuerySnapshot) => void;
        error?: (error: Error) => void;
        complete?: () => void;
      }
    ): () => void;
    onSnapshot(
      onNext: (snapshot: QuerySnapshot) => void,
      onError?: (error: Error) => void,
      onCompletion?: () => void
    ): () => void;
    onSnapshot(
      options: QueryListenOptions,
      onNext: (snapshot: QuerySnapshot) => void,
      onError?: (error: Error) => void,
      onCompletion?: () => void
    ): () => void;
  }

  /**
   * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
   * representing the results of a query. The documents can be accessed as an
   * array via the `docs` property or enumerated using the `forEach` method. The
   * number of documents can be determined via the `empty` and `size`
   * properties.
   */
  export class QuerySnapshot {
    private constructor();

    /**
     * The query on which you called `get` or `onSnapshot` in order to get this
     * `QuerySnapshot`.
     */
    readonly query: Query;
    /**
     * Metadata about this snapshot, concerning its source and if it has local
     * modifications.
     */
    readonly metadata: SnapshotMetadata;
    /**
     * An array of the documents that changed since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as added
     * changes.
     */
    readonly docChanges: DocumentChange[];

    /** An array of all the documents in the QuerySnapshot. */
    readonly docs: DocumentSnapshot[];

    /** The number of documents in the QuerySnapshot. */
    readonly size: number;

    /** True if there are no documents in the QuerySnapshot. */
    readonly empty: boolean;

    /**
     * Enumerates all of the documents in the QuerySnapshot.
     *
     * @param callback A callback to be called with a `DocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg The `this` binding for the callback.
     */
    forEach(callback: (result: DocumentSnapshot) => void, thisArg?: any): void;
  }

  /**
   * The type of of a `DocumentChange` may be 'added', 'removed', or 'modified'.
   */
  export type DocumentChangeType = 'added' | 'removed' | 'modified';

  /**
   * A `DocumentChange` represents a change to the documents matching a query.
   * It contains the document affected and the type of change that occurred.
   */
  export interface DocumentChange {
    /** The type of change ('added', 'modified', or 'removed'). */
    readonly type: DocumentChangeType;

    /** The document affected by this change. */
    readonly doc: DocumentSnapshot;

    /**
     * The index of the changed document in the result set immediately prior to
     * this DocumentChange (i.e. supposing that all prior DocumentChange objects
     * have been applied). Is -1 for 'added' events.
     */
    readonly oldIndex: number;

    /**
     * The index of the changed document in the result set immediately after
     * this DocumentChange (i.e. supposing that all prior DocumentChange
     * objects and the current DocumentChange object have been applied).
     * Is -1 for 'removed' events.
     */
    readonly newIndex: number;
  }

  /**
   * A `CollectionReference` object can be used for adding documents, getting
   * document references, and querying for documents (using the methods
   * inherited from `Query`).
   */
  export class CollectionReference extends Query {
    private constructor();

    /** The identifier of the collection. */
    readonly id: string;

    /**
     * A reference to the containing Document if this is a subcollection, else
     * null.
     */
    readonly parent: DocumentReference | null;

    /**
     * A string representing the path of the referenced collection (relative
     * to the root of the database).
     */
    readonly path: string;

    /**
     * Get a `DocumentReference` for the document within the collection at the
     * specified path. If no path is specified, an automatically-generated
     * unique ID will be used for the returned DocumentReference.
     *
     * @param documentPath A slash-separated path to a document.
     * @return The `DocumentReference` instance.
     */
    doc(documentPath?: string): DocumentReference;

    /**
     * Add a new document to this collection with the specified data, assigning
     * it a document ID automatically.
     *
     * @param data An Object containing the data for the new document.
     * @return A Promise resolved with a `DocumentReference` pointing to the
     * newly created document after it has been written to the backend.
     */
    add(data: DocumentData): Promise<DocumentReference>;
  }

  /**
   * Sentinel values that can be used when writing document fields with set()
   * or update().
   */
  export class FieldValue {
    private constructor();

    /**
     * Returns a sentinel used with set() or update() to include a
     * server-generated timestamp in the written data.
     */
    static serverTimestamp(): FieldValue;

    /**
     * Returns a sentinel for use with update() to mark a field for deletion.
     */
    static delete(): FieldValue;
  }

  /**
   * A FieldPath refers to a field in a document. The path may consist of a
   * single field name (referring to a top-level field in the document), or a
   * list of field names (referring to a nested field in the document).
   */
  export class FieldPath {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames A list of field names.
     */
    constructor(...fieldNames: string[]);

    /**
     * Returns a special sentinel FieldPath to refer to the ID of a document.
     * It can be used in queries to sort or filter by the document ID.
     */
    static documentId(): FieldPath;
  }

  /**
   * The set of Firestore status codes. The codes are the same at the ones
   * exposed by gRPC here:
   * https://github.com/grpc/grpc/blob/master/doc/statuscodes.md
   *
   * Possible values:
   * - 'cancelled': The operation was cancelled (typically by the caller).
   * - 'unknown': Unknown error or an error from a different error domain.
   * - 'invalid-argument': Client specified an invalid argument. Note that this
   *   differs from 'failed-precondition'. 'invalid-argument' indicates
   *   arguments that are problematic regardless of the state of the system
   *   (e.g. an invalid field name).
   * - 'deadline-exceeded': Deadline expired before operation could complete.
   *   For operations that change the state of the system, this error may be
   *   returned even if the operation has completed successfully. For example,
   *   a successful response from a server could have been delayed long enough
   *   for the deadline to expire.
   * - 'not-found': Some requested document was not found.
   * - 'already-exists': Some document that we attempted to create already
   *   exists.
   * - 'permission-denied': The caller does not have permission to execute the
   *   specified operation.
   * - 'resource-exhausted': Some resource has been exhausted, perhaps a
   *   per-user quota, or perhaps the entire file system is out of space.
   * - 'failed-precondition': Operation was rejected because the system is not
   *   in a state required for the operation's execution.
   * - 'aborted': The operation was aborted, typically due to a concurrency
   *   issue like transaction aborts, etc.
   * - 'out-of-range': Operation was attempted past the valid range.
   * - 'unimplemented': Operation is not implemented or not supported/enabled.
   * - 'internal': Internal errors. Means some invariants expected by
   *   underlying system has been broken. If you see one of these errors,
   *   something is very broken.
   * - 'unavailable': The service is currently unavailable. This is most likely
   *   a transient condition and may be corrected by retrying with a backoff.
   * - 'data-loss': Unrecoverable data loss or corruption.
   * - 'unauthenticated': The request does not have valid authentication
   *   credentials for the operation.
   */
  export type FirestoreErrorCode =
    | 'cancelled'
    | 'unknown'
    | 'invalid-argument'
    | 'deadline-exceeded'
    | 'not-found'
    | 'already-exists'
    | 'permission-denied'
    | 'resource-exhausted'
    | 'failed-precondition'
    | 'aborted'
    | 'out-of-range'
    | 'unimplemented'
    | 'internal'
    | 'unavailable'
    | 'data-loss'
    | 'unauthenticated';

  /** An error returned by a Firestore operation. */
  // TODO(b/63008957): FirestoreError should extend firebase.FirebaseError
  export interface FirestoreError {
    code: FirestoreErrorCode;
    message: string;
    name: string;
    stack?: string;
  }
}
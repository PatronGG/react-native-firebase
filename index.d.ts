// Type definitions for React Native Firebase  v1.0.0-alpha7
// Project: https://github.com/invertase/react-native-firebase
// Definitions by: Tal <https://github.com/taljacobson>
// TypeScript Version: 2.1

declare module "react-native-firebase" {

  export default class FireBase {
    constructor(config?: RNFirebase.configurationOptions)

    log: any;

    analytics(): RNFirebase.Analytics;

    auth(): RNFirebase.auth.Auth;

    on(type: string, handler: (msg: any) => void): any;

    /** mimics firebase Web SDK */
    database: {
      (): RNFirebase.database.Database
      ServerValue: {
        TIMESTAMP: number
      }
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

    firestore() : RNFirebase.firestore.Firestore

    apps: Array<string>;
    googleApiAvailability: RNFirebase.GoogleApiAvailabilityType;

    static initializeApp(options?: any | RNFirebase.configurationOptions, name?: string): FireBase;

    static app(name?: string): FireBase;

    static firestore(app? :FireBase): RNFirebase.firestore.Firestore;
    static storage(app? :FireBase): RNFirebase.storage.Storage;
    static messaging(app? :FireBase): RNFirebase.messaging.Messaging;
    static crash(app? :FireBase): RNFirebase.crash.Crash;
    static analytics(app? :FireBase): RNFirebase.Analytics;
    static auth(app? :FireBase): RNFirebase.auth.Auth;
    static database: {
      (app? :FireBase): RNFirebase.database.Database
      ServerValue: {
        TIMESTAMP: number
      }
    };

    [key: string]: any;
  }

  namespace RNFirebase {
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
        child(path: string): storage.Reference;
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

      interface ThenableReference<T> extends Promise<T> {}
      interface ThenableReference<T> extends Reference {}

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
      setCurrentScreen(screenName: string, screenClassOverride?: string): void
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
      setUserId(id: string): void
      /**
       * Sets a key/value pair of data on the current user.
       */
      setUserProperty(name: string, value: string): void;
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
    namespace firestore {
      /**
       * Document data (for use with `DocumentReference.set()`) consists of fields
       * mapped to values.
       */
      export type DocumentData = {[field: string]: any};
    
      /**
       * Update data (for use with `DocumentReference.update()`) consists of field
       * paths (e.g. 'foo' or 'foo.baz') mapped to values. Fields that contain dots
       * reference nested fields within the document.
       */
      export type UpdateData = {[fieldPath: string]: any};
    
      /**
       * Sets the log function for all active Firestore instances.
       */
      function setLogFunction(logger: (msg:string) => void): void;
    
      /**
       * `Firestore` represents a Firestore Database and is the entry point for all
       * Firestore operations.
       */
      export class Firestore {
        /**
         * @param options - Configuration object. See [Firestore Documentation]
         * {@link https://firebase.google.com/docs/firestore/}
         */
        public constructor(options?: any);
    
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
         * Retrieves multiple documents from Firestore.
         *
         * @param documentRef The `DocumentReferences` to receive.
         * @return A Promise that resolves with an array of resulting document
         * snapshots.
         */
        getAll(...documentRef: DocumentReference[]): Promise<DocumentSnapshot[]>;
    
        /**
         * Executes the given updateFunction and commits the changes applied within
         * the transaction.
         *
         * You can use the transaction object passed to 'updateFunction' to read and
         * modify Firestore documents under lock. Transactions are committed once
         * 'updateFunction' resolves and attempted up to five times on failure.
         *
         * @param updateFunction The function to execute within the transaction
         * context.
         * @return If the transaction completed successfully or was explicitly
         * aborted (by the updateFunction returning a failed Promise), the Promise
         * returned by the updateFunction will be returned here. Else if the
         * transaction failed, a rejected Promise with the corresponding failure
         * error will be returned.
         */
        runTransaction<T>(updateFunction: (transaction: Transaction) => Promise<T>):
        Promise<T>;
    
        /**
         * Creates a write batch, used for performing multiple writes as a single
         * atomic operation.
         */
        batch(): WriteBatch;
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
       * A reference to a transaction.
       * The `Transaction` object passed to a transaction's updateFunction provides
       * the methods to read and write data within the transaction context. See
       * `Firestore.runTransaction()`.
       */
      export class Transaction {
        private constructor();
    
        /**
         * Reads the document referenced by the provided `DocumentReference.`
         * Holds a pessimistic lock on the returned document.
         *
         * @param documentRef A reference to the document to be read.
         * @return A DocumentSnapshot for the read data.
         */
        get(documentRef: DocumentReference): Promise<DocumentSnapshot>;
    
        /**
         * Retrieves a query result. Holds a pessimistic lock on the returned
         * documents.
         *
         * @param query A query to execute.
         * @return A QuerySnapshot for the retrieved data.
         */
        get(query: Query): Promise<QuerySnapshot>;
    
        /**
         * Create the document referred to by the provided `DocumentReference`.
         * The operation will fail the transaction if a document exists at the
         * specified location.
         *
         * @param documentRef A reference to the document to be create.
         * @param data The object data to serialize as the document.
         * @return This `Transaction` instance. Used for chaining method calls.
         */
        create(documentRef: DocumentReference, data: DocumentData): Transaction;
    
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
        set(documentRef: DocumentReference, data: DocumentData,
            options?: SetOptions): Transaction;
    
        /**
         * Updates fields in the document referred to by the provided
         * `DocumentReference`. The update will fail if applied to a document that
         * does not exist.
         *
         * Nested fields can be updated by providing dot-separated field path
         * strings.
         *
         * @param documentRef A reference to the document to be updated.
         * @param data An object containing the fields and values with which to
         * update the document.
         * @param precondition A Precondition to enforce on this update.
         * @return This `Transaction` instance. Used for chaining method calls.
         */
        update(documentRef: DocumentReference, data: UpdateData,
               precondition?: Precondition): Transaction;
    
        /**
         * Updates fields in the document referred to by the provided
         * `DocumentReference`. The update will fail if applied to a document that
         * does not exist.
         *
         * Nested fields can be updated by providing dot-separated field path
         * strings or by providing FieldPath objects.
         *
         * A `Precondition` restricting this update can be specified as the last
         * argument.
         *
         * @param documentRef A reference to the document to be updated.
         * @param field The first field to update.
         * @param value The first value
         * @param fieldsOrPrecondition An alternating list of field paths and values
         * to update, optionally followed by a `Precondition` to enforce on this
         * update.
         * @return This `Transaction` instance. Used for chaining method calls.
         */
        update(documentRef: DocumentReference, field: string|FieldPath, value:any,
               ...fieldsOrPrecondition: any[]): Transaction;
    
        /**
         * Deletes the document referred to by the provided `DocumentReference`.
         *
         * @param documentRef A reference to the document to be deleted.
         * @param precondition A Precondition to enforce for this delete.
         * @return This `Transaction` instance. Used for chaining method calls.
         */
        delete(documentRef: DocumentReference,
               precondition?: Precondition): Transaction;
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
         * Create the document referred to by the provided `DocumentReference`. The
         * operation will fail the batch if a document exists at the specified
         * location.
         *
         * @param documentRef A reference to the document to be created.
         * @param data The object data to serialize as the document.
         * @return This `WriteBatch` instance. Used for chaining method calls.
         */
        create(documentRef: DocumentReference, data: DocumentData): WriteBatch;
    
        /**
         * Write to the document referred to by the provided `DocumentReference`.
         * If the document does not exist yet, it will be created. If you pass
         * `SetOptions`, the provided data can be merged into the existing document.
         *
         * @param documentRef A reference to the document to be set.
         * @param data An object of the fields and values for the document.
         * @param options An object to configure the set behavior.
         * @return This `WriteBatch` instance. Used for chaining method calls.
         */
        set(documentRef: DocumentReference, data: DocumentData,
            options?: SetOptions): WriteBatch;
    
        /**
         * Update fields of the document referred to by the provided
         * `DocumentReference`. If the document doesn't yet exist, the update fails
         * and the entire batch will be rejected.
         *
         * Nested fields can be updated by providing dot-separated field path
         * strings.
         *
         * @param documentRef A reference to the document to be updated.
         * @param data An object containing the fields and values with which to
         * update the document.
         * @param precondition A Precondition to enforce on this update.
         * @return This `WriteBatch` instance. Used for chaining method calls.
         */
        update(documentRef: DocumentReference, data: UpdateData,
               precondition?: Precondition): WriteBatch;
    
        /**
         * Updates fields in the document referred to by the provided
         * `DocumentReference`. The update will fail if applied to a document that
         * does not exist.
         *
         * Nested fields can be updated by providing dot-separated field path
         * strings or by providing FieldPath objects.
         *
         * A `Precondition` restricting this update can be specified as the last
         * argument.
         *
         * @param documentRef A reference to the document to be updated.
         * @param field The first field to update.
         * @param value The first value
         * @param fieldsOrPrecondition An alternating list of field paths and values
         * to update, optionally followed a `Precondition` to enforce on this update.
         * @return This `WriteBatch` instance. Used for chaining method calls.
         */
        update(documentRef: DocumentReference, field: string|FieldPath, value:any,
               ...fieldsOrPrecondition: any[]): WriteBatch;
    
        /**
         * Deletes the document referred to by the provided `DocumentReference`.
         *
         * @param documentRef A reference to the document to be deleted.
         * @param precondition A Precondition to enforce for this delete.
         * @return This `WriteBatch` instance. Used for chaining method calls.
         */
        delete(documentRef: DocumentReference,
               precondition?: Precondition): WriteBatch;
    
        /**
         * Commits all of the writes in this write batch as a single atomic unit.
         *
         * @return A Promise resolved once all of the writes in the batch have been
         * successfully written to the backend as an atomic unit.
         */
        commit(): Promise<WriteResult[]>;
      }
    
      /**
       * An options object that configures conditional behavior of `update()` and
       * `delete()` calls in `DocumentReference`, `WriteBatch`, and `Transaction`.
       * Using Preconditions, these calls can be restricted to only apply to
       * documents that match the specified restrictions.
       */
      export interface Precondition {
        /**
         * If set, the last update time to enforce (specified as an ISO 8601
         * string).
         */
        readonly lastUpdateTime?: string;
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
       * A WriteResult wraps the write time set by the Firestore servers on `sets()`,
       * `updates()`, and `creates()`.
       */
      export class WriteResult {
        private constructor();
    
        /**
         * The write time as set by the Firestore servers. Formatted as an ISO-8601
         * string.
         */
        readonly writeTime: string;
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
         * Creates a document referred to by this `DocumentReference` with the
         * provided object values. The write fails if the document already exists
         *
         * @param data The object data to serialize as the document.
         * @return A Promise resolved with the write time of this create.
         */
        create(data: DocumentData): Promise<WriteResult>;
    
        /**
         * Writes to the document referred to by this `DocumentReference`. If the
         * document does not yet exist, it will be created. If you pass
         * `SetOptions`, the provided data can be merged into an existing document.
         *
         * @param data A map of the fields and values for the document.
         * @param options An object to configure the set behavior.
         * @return A Promise resolved with the write time of this set.
         */
        set(data: DocumentData, options?: SetOptions): Promise<WriteResult>;
    
        /**
         * Updates fields in the document referred to by this `DocumentReference`.
         * The update will fail if applied to a document that does not exist.
         *
         * Nested fields can be updated by providing dot-separated field path
         * strings.
         *
         * @param data An object containing the fields and values with which to
         * update the document.
         * @param precondition A Precondition to enforce on this update.
         * @return A Promise resolved with the write time of this update.
         */
        update(data: UpdateData, precondition?: Precondition): Promise<WriteResult>;
    
        /**
         * Updates fields in the document referred to by this `DocumentReference`.
         * The update will fail if applied to a document that does not exist.
         *
         * Nested fields can be updated by providing dot-separated field path
         * strings or by providing FieldPath objects.
         *
         * A `Precondition` restricting this update can be specified as the last
         * argument.
         *
         * @param field The first field to update.
         * @param value The first value.
         * @param moreFieldsOrPrecondition An alternating list of field paths and
         * values to update, optionally followed by a `Precondition` to enforce on
         * this update.
         * @return A Promise resolved with the write time of this update.
         */
        update(field: string|FieldPath, value:any,
               ...moreFieldsOrPrecondition: any[]): Promise<WriteResult>;
    
        /**
         * Deletes the document referred to by this `DocumentReference`.
         *
         * @param precondition A Precondition to enforce for this delete.
         * @return A Promise resolved with the write time of this delete.
         */
        delete(precondition?:Precondition): Promise<WriteResult>;
    
        /**
         * Reads the document referred to by this `DocumentReference`.
         *
         * @return A Promise resolved with a DocumentSnapshot containing the
         * current document contents.
         */
        get(): Promise<DocumentSnapshot>;
    
        /**
         * Attaches a listener for DocumentSnapshot events.
         *
         * @param onNext A callback to be called every time a new `DocumentSnapshot`
         * is available.
         * @param onError A callback to be called if the listen fails or is
         * cancelled. No further callbacks will occur.
         * @return An unsubscribe function that can be called to cancel
         * the snapshot listener.
         */
        onSnapshot(onNext: (snapshot: DocumentSnapshot) => void,
                   onError?: (error: Error) => void): () => void;
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
         * The time the document was created. Not set for documents that don't
         * exist.
         */
        readonly createTime?: string;
    
        /**
         * The time the document was last updated (at the time the snapshot was
         * generated). Not set for documents that don't exist.
         */
        readonly updateTime?: string;
    
        /**
         * The time this snapshot was read.
         */
        readonly readTime: string;
    
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
        get(fieldPath: string|FieldPath): any;
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
         * This function returns a new (immutable) instance of the Query (rather
         * than modify the existing instance) to impose the filter.
         *
         * @param fieldPath The path to compare
         * @param opStr The operation string (e.g "<", "<=", "==", ">", ">=").
         * @param value The value for comparison
         * @return The created Query.
         */
        where(fieldPath: string|FieldPath, opStr: WhereFilterOp, value: any): Query;
    
        /**
         * Creates and returns a new Query that's additionally sorted by the
         * specified field, optionally in descending order instead of ascending.
         *
         * This function returns a new (immutable) instance of the Query (rather
         * than modify the existing instance) to impose the order.
         *
         * @param fieldPath The field to sort by.
         * @param directionStr Optional direction to sort by ('asc' or 'desc'). If
         * not specified, order will be ascending.
         * @return The created Query.
         */
        orderBy(fieldPath: string|FieldPath, directionStr?: OrderByDirection):
        Query;
    
        /**
         * Creates and returns a new Query that's additionally limited to only
         * return up to the specified number of documents.
         *
         * This function returns a new (immutable) instance of the Query (rather
         * than modify the existing instance) to impose the limit.
         *
         * @param limit The maximum number of items to return.
         * @return The created Query.
         */
        limit(limit: number): Query;
    
        /**
         * Specifies the offset of the returned results.
         *
         * This function returns a new (immutable) instance of the Query (rather
         * than modify the existing instance) to impose the offset.
         *
         * @param offset The offset to apply to the Query results.
         * @return The created Query.
         */
        offset(offset: number): Query;
    
        /**
         * Creates and returns a new Query instance that applies a field mask to
         * the result and returns only the specified subset of fields. You can
         * specify a list of field paths to return, or use an empty list to only
         * return the references of matching documents.
         *
         * This function returns a new (immutable) instance of the Query (rather
         * than modify the existing instance) to impose the field mask.
         *
         * @param field The field paths to return.
         * @return The created Query.
         */
        select(...field: (string | FieldPath)[]): Query;
    
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
         * Executes the query and returns the results as a `QuerySnapshot`.
         *
         * @return A Promise that will be resolved with the results of the Query.
         */
        get(): Promise<QuerySnapshot>;
    
        /*
         * Executes the query and returns the results as Node Stream.
         *
         * @return A stream of DocumentSnapshots.
         */
        // stream(): NodeJS.ReadableStream;
    
        /**
         * Attaches a listener for `QuerySnapshot `events.
         *
         * @param onNext A callback to be called every time a new `QuerySnapshot`
         * is available.
         * @param onError A callback to be called if the listen fails or is
         * cancelled. No further callbacks will occur.
         * @return An unsubscribe function that can be called to cancel
         * the snapshot listener.
         */
        onSnapshot(onNext: (snapshot: QuerySnapshot) => void,
                   onError?: (error: Error) => void) : () => void;
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
    
        /** The time this query snapshot was obtained. */
        readonly readTime: string;
    
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
        readonly parent: DocumentReference|null;
    
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
    }
  }
}

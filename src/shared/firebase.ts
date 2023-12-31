import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // realtime database 설정
// vite 환경변수 설정 셋팅
const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_DATABASE_URL,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
} = import.meta.env;

// 현재 프로젝트 파이어베이스 config
//config 파일은 내 파이어베이스 프로젝트의 API key나, authDomain 등을 저장하고, 해당 정보로 firebase 메서드를 초기화하기 위한 것. 마지막 줄에 원하는 이름의 변수로 파이어베이스 앱을 초기화해 export 시켜주면, 다른 ts 파일에서 불러와 다양한 메서드를 사용할 수 있게 된다.

const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: VITE_FIREBASE_DATABASE_URL,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
};

// 파이어 베이스 초기화
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const apiKey = firebaseConfig.apiKey;

// 오류 발생
// app/no-app Firebase: No Firebase App '[DEFAULT]' has been created - call initializeApp() first (app/no-app). 이라는 오류가 발생했다.
// 찾아보니, 해당 오류는 firebase에서 제공하는 app 의 initializeApp 메서드에서 발생한다고 한다.
// 왜 문제가 되나 했더니 애초에 firebase는 한번만 초기화 될 수 있기에 이미 초기화 되었는지 확인하고, 초기화 된경우에만 초기화를 진행시킨다. 그렇지 않은 경우엔 그냥 firebase app만 반환시켜줘야한다.

// export const initializeLoginFramework = !firebase.getApps.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.getApp;

// 위의 코드도 아니였다...
// 해결한 부분은 바로 firebase패키지를 불러오는 경로가 'firebase/app'이 아닌 'firebase/compat/app' 이다..
// 너무 궁금해서 다른점을 찾기 위해 node_modules 디렉토리를 감히(?) 파해쳐봤다.
// 둘다 들어있는 코드는 동일했다.. (?)

// 그래서 다시 찾아본 결과,
// Firebase의 firebase/app와 firebase/compat/app는 Firebase SDK의 두 가지 다른 초기화 방식을 나타낸다고 한다. 이 두 가지 방식은 Firebase의 버전 업데이트와 호환성 유지를 위한 것이고, 각각의 차이점은 아래와 같았다.

// 1. 'firebase/app' :
// Firebase v9 이전의 버전에서 사용되었습니다.
// 이 초기화 방식은 모듈화된 Firebase 패키지를 사용하며, 다양한 Firebase 서비스를 개별적으로 가져와서 사용합니다.
// 예를 들어, Firestore를 사용하려면 import firebase/firestore와 같이 필요한 Firebase 서비스를 개별적으로 가져와야 합니다.

// 2. 'firebase/compat/app' :
// Firebase v9 이후의 버전에서 사용되는 호환성 레이어입니다.
// 호환성 레이어는 이전 버전의 Firebase 코드를 그대로 사용할 수 있도록 하기 위해 제공됩니다. 이전 버전과 호환성을 유지하면서 Firebase v9 이후의 버전을 사용할 수 있습니다.
// 초기화 방식은 이전 버전과 유사하게 import firebase from 'firebase/compat/app'와 같이 가져옵니다.
// Firebase 서비스를 개별적으로 가져오는 대신 firebase.firestore()와 같이 호환성 레이어를 통해 Firebase 서비스를 사용할 수 있습니다.

// Firebase v9 이후의 버전부터는 새로운 모듈화된 SDK가 도입되었으며, 이전 버전과 호환성을 유지하기 위해 호환성 레이어가 제공되었습니다. 새로운 SDK는 개발자에게 더 많은 유연성을 제공하고, 필요한 서비스만 가져와서 사용할 수 있습니다.

// 따라서 프로젝트의 Firebase 버전에 따라 firebase/app 또는 firebase/compat/app 중 하나를 선택하여 Firebase 초기화 방식을 사용하면 됩니다. 새로운 프로젝트를 시작할 경우에는 새로운 모듈화된 SDK를 사용하는 것을 권장합니다.

// 현재 내가 작성하는 코드는 firebase v8호환 모듈을 사용하고 있어서 firebase v9 이상을 사용하려면 v9 호환 모듈로 코드를 업데이트 해야할 필요가 있었다.
// 정리하자면
// Firebase 초기화 부분에서 firebase/app 모듈을 불러오고 firebase.initializeApp(firebaseConfig)을 실행한 후, 해당 앱(app) 객체를 변수에 할당하고 내보내야 한다.

// Firebase 다른 모듈을 사용할 때에는 해당 앱 객체를 매개변수로 전달하여 가져와야 합니다. 예를 들어, firebase/auth 모듈을 사용할 때 getAuth(app)와 같이 앱 객체를 전달해야 합니다.

// 간단히 말해서, 코드를 Firebase v9 호환 모듈에 맞게 업데이트하고, 초기화 된 앱 객체를 사용하여 다른 Firebase 모듈을 호출해야 합니다.

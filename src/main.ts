import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { environment } from './environments/environment.development';
import { provideFirestore, getFirestore} from '@angular/fire/firestore';
import { provideAuth, getAuth} from '@angular/fire/auth';
import { provideStorage, getStorage} from '@angular/fire/storage';


bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    ...appConfig.providers
  ]
})
  .catch((err) => console.error(err));

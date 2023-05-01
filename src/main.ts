import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css';
import { faUserSecret, 
    faBook, faHandFist, 
    faEarthEurope, 
    faListCheck, 
    faDiceD20, 
    faHandHoldingHand, 
    faArrowRight,
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue'
import router from './router'

import './assets/main.css'
import axios, { type AxiosInstance } from 'axios'


library.add(faUserSecret);
library.add(faBook);
library.add(faHandFist);
library.add(faEarthEurope);
library.add(faListCheck);
library.add(faDiceD20);
library.add(faHandHoldingHand);
library.add(faArrowRight);
library.add(faPenToSquare);

const app = createApp(App);

app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon);

app.provide<AxiosInstance>('apiBase', axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    headers:{
        Accept:'applications/json'
    }
}));

app.mount('#app')

export {app}
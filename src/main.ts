import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, 
    faBook, faHandFist, 
    faEarthEurope, 
    faListCheck, 
    faDiceD20, 
    faHandHoldingHand, 
    faArrowRight,
    faPenToSquare,
    faLink,
    faHouse,
    faDeleteLeft,
    faEye,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import App from './App.vue'
import router from './router'
import data from '../config.json';

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
library.add(faLink);
library.add(faHouse);
library.add(faDeleteLeft);
library.add(faEye);
library.add(faEyeSlash);

const app = createApp(App);

app.use(router);

app.component('font-awesome-icon', FontAwesomeIcon);

app.provide<AxiosInstance>('apiBase', axios.create({
    baseURL: data.api_base_url,
    withCredentials: true,
    headers:{
        Accept:'applications/json'
    }
}));

app.mount('#app')

export {app}
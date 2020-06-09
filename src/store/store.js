import Vue from 'vue';
import Vuex from 'vuex';
import data from './data.js';

Vue.use(Vuex);

let store = new Vuex.Store({
	modules:{
		data:data
	}
})

export default store;
export default {
	state:{
		height: '',
		carts: [],
		personal: {
			name: 'wzp',
			telephone: '13272009464',
			place: 'place_1'
		}
	},
	getters:{
		getHeight(state){
			return state.height;
		},
		getCarts(state){
			return state.carts;
		},
		getPersonal(state){
			return state.personal
		}
	},
	mutations:{
		setCarts(state, goods){
			state.carts = goods
		},
		setHeight(state, height){
			state.height = height;
		},
		setPersonal(state, personal){
			state.personal = personal
		}
	},
	//action中的异步行为
	action:{
		changeNumByAsnc({commit}, height){
			commit('setHeight', height);
		}
	}
}
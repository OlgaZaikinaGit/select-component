<template>
    <div class="select-el mr-bt-20">
		<input type="text" name="select" class="select-el__input" 
		    ref="find"
			v-model="searchText"   
			v-bind:placeholder="placeholder" 
			v-on:focus="onFocus" 
			v-on:blur="onBlur" 
			v-on:change="onChange"
			v-make_focus="isFocus" 
			v-bind:disabled="isDisabled"
			v-on:click="isOpenList = !isOpenList"
			v-on:keyup.enter="onSubmit"
			v-on:keydown.40="onKeydownInput"
		>
		<select class="select-tag" 
			ref="select" 
			v-model="selectedName" 
			v-on:change="onChangeSelect" 
			v-on:keydown.13="onClickSelect" 
			v-show="isOpenList && !isDisabled" 
			v-if="list.length > 0">
			<option v-bind:value="option" v-for="(option,index) in list_options">{{ option.name }}</option>
		</select>
		<div class="select-el__list select-list" v-show="isOpenList && !isDisabled" v-if="list_options.length > 0">
			<option-el v-for="(option,index) in list_options" v-on:click="selectItem(index)" v-bind:class="{ active: option.isActive }" v-bind:key="index + option.name">
				{{ option.name }}
			</option-el>
		</div>
		<div class="select-el__list select-list select-list-empty"  v-else v-show="isFocus && !isDisabled">
			<div class="not-find">Ничего не найдено :(</div>
		</div>
	</div>
</template>

<script>
  import Vue from 'vue';
  
  Vue.component('option-el', {
	  data: function () {
		return {
		  count: 0
		}
	  },
	  template: '<template><div class="select-list__item"><slot></slot></div></template>'
  });
  export default { 
    props: {
	  /*
	   *
	   *  Kinds data:  
	   *  1 - string, 
	   *  2 - list, 
	   *  3 - object
	   *  By default typeData = 1
	   */
	  typeData: {
		default: 1,
		type: Number
	  },
	  placeholder: {
		default: 'Nothing selected',
		type: String
	  },
	  name_key: {
		default: 'name',
		type: String
	  },
	  value_key: {
		default: 'value',
		type: String
	  },
	  isDisabled: {
		default: false,
		type: Boolean
	  },
	  isSearch: {
		default: true,
		type: Boolean
	  },
	  isFocus: {
		default: false,
		type: Boolean
	  },
	  isOpenList: {
		default: false,
		type: Boolean
	  },
	  hasError: {
		default: false,
		type: Boolean
	  },
	  list: Array,
	  searchText: {
		default: '',
		type: String
	  },
	  activeItem: null
	},
	data() {
	    return {
			input_for_select: null,
			arrayTypeData: ["string", "object", "list"],
			list_options: []
		}
	},
	created() {
		
	},
	mounted() {
		this.input_for_select = this.$refs.find;
		this.createOptionsList();
	},
	updated () { 
	
	},
    destroyed () { 
	
	},
	methods: {
      onChange() {
	    this.$emit('change', this.searchText);
	  },
	  onChangeSelect() {
		let index = this.list_options.indexOf(this.selectedName);
		this.setActiveItem(index);
		this.searchText = this.selectedName.name;
	  },
	  onClickSelect(event) {
	    event.preventDefault();
		this.isOpenList = false;
		this.onChange();
	  },
	  setActiveItem(index){
	    if(index != -1){
			let result = this.list_options.map(function(item, index, array) {
				item.isActive = false;
			});
			this.list_options[index].isActive = true;
		}
	  },
	  onInput() {
	    this.$emit('input', this.searchText);
	  },
	  onKeydownInput() {
		if(this.list_options.length > 0){
			if(!this.isOpenList){
				this.isOpenList = true;
			}
			this.$refs.select.focus();
		}
	  },
	  onFocus() {
		this.isFocus = true;
	  },
	  onBlur() {
	    this.isFocus = false;
	  },
	  onSubmit() {
	    this.searchText = this.searchText.trim();
	    if(this.searchText.length > 0){
			this.isDisabled = true;
			setTimeout(this.makeDisabledTimer, 1000);
			console.log('submit');
		}
	  },
	  makeDisabledTimer() {
		this.isDisabled = false;
	  },
	  selectItem(index) {
		this.searchText = this.list_options[index].value;
		this.isOpenList = false;
		this.input_for_select.focus();
		this.setActiveItem(index);
		this.onChange();
	  },
	  
	  // Make array for output in view
	  createOptionsList() {
		this.list_options = [];
		if(this.list.length > 0 || !this.isDisabled){
			for(let i = 0; i < this.list.length; i++){
				var option = new Object();
				option.isActive = false; 
				
				//if data is string
				if(this.typeData == 1){
					option.name = this.list[i];
					option.value = this.list[i];
					if(this.activeItem == this.list[i]){
						option.isActive = true; 
						this.searchText = option.name;
					}
				}
				
				//if data is list 
				if(this.typeData == 2){
					option.name = this.list[i][0];
					option.value = this.list[i][1];
				
					if(JSON.stringify(this.activeItem)==JSON.stringify(this.list[i])){
						option.isActive = true; 
						this.searchText = option.name;
					}
				}
				
				//if data is object 
				if(this.typeData == 3){
					option.name = this.list[i][this.name_key];
					option.value = this.list[i][this.value_key];

					if(JSON.stringify(this.activeItem)==JSON.stringify(this.list[i])){
						option.isActive = true; 
						this.searchText = option.name;
					}
				}
				
				this.list_options.push(option);
			}
		}
	  }
	},
	directives: {
	  make_focus: {
		inserted: function (el,binding) {
		  if(binding.value){
		    el.focus();
		  }
		}
	  }
	}
  }
</script>
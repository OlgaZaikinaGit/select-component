<template>
  <div>
    <h1>Great select!</h1>
	<select-el 
		:placeholder="placeholder" 
		:list="list" 
		:isFocus="false" 
		:isDisabled="false"
		:activeItem="activeItem"
		:typeData="typeData"
		:name_key="name_key"
		:value_key="name_key"
		v-on:input="onInput" 
		v-on:change="onChanged"
	></select-el>
	
	<select-el 
		:list="list1" 
		:isFocus="true" 
		:isDisabled="true"
		:typeData="typeData1"
		:activeItem="activeItem1"
		v-on:selected="onSelected"
	></select-el>

	<select-el 
		:list="list0" 
		v-on:selected="onSelected" 
		:isFocus="true" 
		:isDisabled="false"
	></select-el>
  </div>
</template>
 
<script>
  export default {
	data() {
		return {
			placeholder: "Вы ничего не выбрали",
			typeData: 3,// 1 - string, 2 - list, 3 - object
			list0: [],
			list: [
			  { option_value: '1', option_name: 'name_1' },
			  { option_value: '2', option_name: 'name_2' },
			  { option_value: '3', option_name: 'name_3' },
			  { option_value: '4', option_name: 'name_4' },
			  { option_value: '5', option_name: 'name_5' }
			],
			activeItem: { option_value: '5', option_name: 'name_5' },
			name_key: "option_name", // by default name
			value_key: "option_value", // by default value
			
			typeData1: 1,// 1 - string, 2 - list, 3 - object
			list1: [
			  "Значение 1",
			  "Значение 2",
			  "Значение 3",
			  "Значение 4",
			  "Значение 5",
			  "Значение 6",
			],
			activeItem1: "Значение 5",
			
			typeData2: 2, // 1 - string, 2 - list, 3 - object
			list2: [
			  [ "Имя 1", "Значение 1" ],
			  [ "Имя 2", "Значение 2" ],
			  [ "Имя 3", "Значение 3" ],
			  [ "Имя 4", "Значение 4" ],
			  [ "Имя 5", "Значение 5" ],
			  [ "Имя 6", "Значение 6" ],
			],
			searchText: ''
		}
	},
	methods: {
      onInput(searchText) {
	    console.log(searchText);
	    console.log('onInput');
	  },
	  onChanged(searchText) {
	    console.log(searchText);
	    console.log('onChanged');
		// requests and others, for example list was changed:
		// ...	
		//
	  }
	}
  }
</script>
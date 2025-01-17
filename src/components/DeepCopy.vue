<template>
	<div>
		<div>{{a}}</div>
		<div>{{b}}</div>
		<button @click="deep">深拷贝</button>
	</div>
</template>

<script>
	export default {
		name: 'DeepCopy',
		data() {
			return {
				a: [{
						i: '213'
					},
					{
						j: '255'
					},
				],
				b: null,
			}
		},
		mounted() {
			this.b = this.a
			this.a = [] //这个操作，表示a指向空的内存空间,会直接切断a与b之间的联系1
		},
		methods: {
			deep() {
				// this.a.push({c:'213411'})
				console.log(this.a.__proto__ === this.a.__proto__)
				console.log(this.b)
				this.a.push({c:'213411'})
				this.b.push({D:'944'})
				console.log(this.a.__proto__ === this.a.__proto__)
			}
			// deep() {
			// 	// this.b = JSON.parse(JSON.stringify(this.a))
			// 	this.b = this.a
			// 	this.a.push({c:'213411'})
			// }
		}
	}
</script>

<style>
</style>

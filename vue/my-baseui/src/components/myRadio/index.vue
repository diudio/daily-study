<template>
	<label :class="className">
		<input
			type="radio" 
			style="display:none"
			:checked="label===value"
			v-bind:value="value"
			v-on:change="toggleState"
		>
	</label>
</template>
<script>
	const prefix = "my-radio"
	export default {
		name: prefix,
		model: {
			prop: "value",
			event: "change"
		},
		props: {
			label: {
				type: [Number, String, Boolean]
			},
			value: {
				type: [Number, String, Boolean]
			}
		},
		data () {
			return {
				prefix
			}
		},
		computed: {
			className () {
				return [
					prefix,
					{[`${prefix}__checked`]: this.label===this.value}
				]
			}
		},
		methods: {
			toggleState () {
				this.$emit('change', this.label)
			}
		}
	}
</script>
<style lang="less">
	.my-radio {
		width: 20px;
		height: 20px;
		display: inline-block;
		position: relative;
		margin-right: 20px;
		vertical-align: baseline;
		&:before {
			content: " ";
			position: absolute;
			border: 1px solid #eee;
			background-color: #fff;
			border-radius: 10px;
			width: 18px;
			height: 18px;
			top: 0;
			left: 0;
		}
		&:after {
			content: " ";
			position: absolute;
			background-color: #fff;
			border-radius: 5px;
			transition: all .2s linear;
			transform: scale(0);
			top: 6px;
			left: 6px;
			width: 8px;
			height: 8px;
		}
	}
	.my-radio__checked:before {
		background-color: #26a2ff;
	}
	.my-radio__checked:after {
		transform: scale(1)
	}
</style>	
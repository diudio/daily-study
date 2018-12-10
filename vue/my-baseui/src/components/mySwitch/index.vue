<template>
	<!-- 此处得用label标签, label标签可以让事件发生时, 他的全部子元素都发生此事件 -->
	<label :class="prefix">
		<input 
			type="checkbox" 
			style="display:none;"
			v-bind:value="value"
			v-on:change="toggleState"
		>
		<span :class="className">
			<slot></slot>
		</span>
	</label>
</template>
<script>
	const prefix = "my-switch"
	export default {
		name: prefix,
		model: {
			prop: 'value',
			event: 'change'
		},
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},	
		data () {
			return {
				prefix
			}
		},
		methods: {
			toggleState () {
				this.$emit('change', !this.value)
			}
		},
		computed: {
			className () {
				return [
					[`${prefix}__core`],
					{[`${prefix}__open`]: this.value},
					{[`${prefix}__close`]: !this.value}
				]
			}
		}
	}
</script>
<style>
	.my-switch {
		
		height: 50px;
	}
</style>
<!-- 
<style lang="less">
.my-switch {
	height: 32px;
	&__core {
		display: inline-block;
		position: relative;
		width: 52px;
		height: 32px;
		border-radius: 20px;
		border: 1px solid #ccc;
		&:before {
			content: " ";		//伪类必须设置content
			position: absolute;
			top: 0;
			left: 0;
			width: 50px;
			height: 30px;
			border-radius: 20px;
			background-color: #fff;
			transition: all .2s linear;
		}
		&:after {
			content: " ";
			position: absolute;
			top: 0;
			width: 30px;
			height: 30px;
			border-radius: 20px;
			background-color: #fff;
			transition: all .2s linear;
			box-shadow: 0 1px 3px rgba(0,0,0,.4);
		}
	}
	&__open {
		background-color: #26a2ff;
		&:before {
			transform: scale(0);
		}
		&:after {
			left: 20px;
		}
	}
	&__close {
		background-color: #ccc;
		&:before {
			transform: scale(1);
		}
		&:after {
			left: 0;
		}
	}
}
</style>	
-->
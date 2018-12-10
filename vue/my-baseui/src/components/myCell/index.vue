<template>
	<div :class="className()">
		<div :class="`${prefix}__title`">
			<slot name="icon"></slot>
			<span>{{title}}</span>
		</div>
		<div :class="`${prefix}__foot`"><slot></slot></div>
	</div>
</template>
<script>
	const prefix = "my-cell"
	export default {
		name: prefix,
		props: {
			title: {
				type: String,
			},
			to: {
				type: String,
			},
			link: {
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
			className () {
				return [
					prefix,
					{[`${prefix}__links`]: this.link}
				]
			}
		}
	}
</script>
<style lang="less">
	.my-cell {
		position: relative;
		display: flex;
		height: 50px;
		padding-left: 10px;
		background-color: #fff;
		&__title {
			flex: 1;
			display: flex;
			align-items: center;
			img {
				width: 30px;
				height: 30px;
				margin-right: 15px;
			}
		}
		&__foot {
			color: grey;
			font-size: 14px;
			display: flex;
			align-items: center;
			padding-right: 20px;
		}
		&:before {
			content: "";
			position: absolute;
			bottom: 0;
			left: 10px;
			right: 0;
			height: .5px;	//这个地方线的高度显示有问题,是个复杂的问题,待解决
			background-color: #ccc;
		}
	}
	.my-cell__links {
		padding-right: 40px;
		&:after { 
			content: "";
			position: absolute;
			width: 6px;
			height: 6px;
			right: 20px;
			top: 21px;
			transform: rotate(45deg);
			border-top: 2px solid #ccc;
			border-right: 2px solid #ccc;
			border-left: 0;
			border-bottom: 0;
		}
	}
</style>
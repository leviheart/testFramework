<template>
    <div>
        <div id="test"></div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {};
    },
    mounted() {
        this.getECharts();
    },
    methods: {
        getECharts() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById("test"), null, {
                // width: 100,
                height: 500,
            });
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '15%',
                    right: '10%',
                    orient: 'vertical', // 图例垂直布局
                    align: 'right', // 图例文字靠右对齐
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 40,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            { value: 1048, name: 'Search Engine' },
                            { value: 735, name: 'Direct' },
                            { value: 580, name: 'Email' },
                            { value: 484, name: 'Union Ads' },
                            { value: 300, name: 'Video Ads' }
                        ]
                    }
                ]
            };

            option && myChart.setOption(option);
            myChart.on('click', (params) => {
                console.log(params);
                this.changeList(params);
            });
            myChart.on('legendselectchanged', (params) => {
                console.log(params, option);
                this.changeList(params);
                //加上这一行
                myChart.setOption({
                    legend: { selected: { [params.name]: true } }
                });
            });
            //防抖
            let timer;
            window.onresize = function () {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    myChart.resize();
                }, 500);
            };
        },
        changeList(params) {
        }
    },
};
</script>
  
<style></style>
<!--
 * @Author: WannTonn
 * @Date: 2021-03-07 10:15:05
 * @LastEditTime: 2021-03-28 22:01:58
 * @LastEditors: WannTonn
 * @Description: 
 * @FilePath: /wanntonn.github.io/_posts/2021-03-07-Data-Warehouse.md
-->
# 专有名词
- Dimension: 维度
- Measure: 度量
- Dimension Table (维度表): 对数据进行分析时用的一个量 eg: 商品价格表
- Fact Table (事实表): 在多维数据仓库中，保存度量值的详细值或事实的表。 eg: 销售统计表 (数据来源包含商品价格表)
    - Star Schema(星型模型): 非正规化的结构，多维数据集的每一个维度都直接与事实表相连接，不存在渐变维度，数据有一定冗余。 eg: A省B城市C县 与 A省B城市D县。 A省B城市冗余。
    - Snowflake Schema(雪花模型): 当有维表没有直接连接到事实表上，是通过其他维表连接到事实表上，图解上就像多个雪花连接在一起。雪花模型是对星型模型的扩展。原有的各维度表可被扩展为小的事实表，被分解的表都连接到主维度表而非事实表。通过最大限度地减少数据存储量以及联合较小的维表来改善查询性能。
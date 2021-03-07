<!--
 * @Author: WannTonn
 * @Date: 2021-03-07 10:15:05
 * @LastEditTime: 2021-03-07 10:21:28
 * @LastEditors: WannTonn
 * @Description: 
 * @FilePath: /wanntonn.github.io/_posts/2021-03-07-Data-Warehouse.md
-->
## 数据仓库 - 数据湖调研经验小总
### MacOS 安装Docker 运行Cloudera Manager
> 安装Docker之后 需要配置8G+ RAM 才能支持Cloudera Manager运行
    
    # 拉取docker Cloudera quickstart 镜像
    $ docker pull cloudera/quickstart:latest
    # 运行docker Cloudera Manager 镜像
    $ docker run --hostname=quickstart.cloudera --privileged=true -t -i -p 8020:8020 -p 8022:8022 -p 7180:7180 -p 21050:21050 -p 50070:50070 -p 50075:50075 -p 50010:50010 -p 50020:50020 -p 8890:8890 -p 60010:60010 -p 10002:10002 -p 25010:25010 -p 25020:25020 -p 18088:18088 -p 8088:8088 -p 19888:19888 -p 7187:7187 -p 11000:11000 cloudera/quickstart /bin/bash -c '/usr/bin/docker-quickstart && /home/cloudera/cloudera-manager --express && service ntpd start'
    # 运行Cloudera Manager Web express
    [root@quickstart /]# sudo /home/cloudera/cloudera-manager --express
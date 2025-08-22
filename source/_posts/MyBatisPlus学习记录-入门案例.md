---
title: MyBatisPlus学习记录-入门案例
date: 2024-08-31 10:04:21
tags:
- mybatisplus
- web
categories:
- Web Dev
- MyBatisPlus
---

*基于黑马程序员视频*
**MyBatisPlus Official Site:** [MyBatisPlus](https://baomidou.com/)

## MybatisPlus简化MyBatis的CRUD操作

MyBatis实现CRUD一般需要在对应的mapper.xml中进行SQL语句编写以实现相关功能，编写大量的单表SQL语句比较繁琐（尤其是改查等操作，需要大量的IF条件语句），MyBatisPlus简化了相关的代码流程。

### 使用MyBatisPlus

**引入依赖包：** A classical springboot autoload dependency

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId> 
    <version>3.5.3.1</version>
</dependency>
```

**定义Mapper：**
自定义的Mapper继承MyBatisPlus提供的BaseMapper接口：

```java
public interface UserMapper extends BaseMapper<User> {
}
```

这个BaseMapper中提供了大量的增删改查预制方法。注意BaseMapper的泛型指定为所需的实体类的类型（对应位代码中的User类）。

在使用CRUD方法是，直接调用UserMapper即可使用BaseMapper中预先设置好的增删改查方法。无需再写mapper中的自定义方法。当然如果仍需要自定义较为复杂度增删改查方法，直接在UserMapper中和mapper.xml中自己编写SQL即可。

## MyBatisPlus常见注解

MyBatisPlus通过扫描实体类，并基于反射获取实体类信息作为数据库表信息。

通过一些约定来找到表、字段等：

- 类名驼峰转下划线为表名
- 名为id的字段作为主键
- 变量名驼峰转下划线作为表的字段名

若实体类不符合这些约定，则需要一些**注解**来指定这些映射：

- **@TableName：** 指定表名
- **@TableId：** 指定表中的主键字段名
- **@TableField：** 指定表中普通字段信息


```java
@TableName("tb_user")  // 'tb_user' is the table name in database
public class User {
    @TableId("id", type=IdType.AUTO)  // 'id' here is the primary key name in database
    private Long user_id; // here the name of primary key is different with the name in database

    @TableField("name")
    private String userName;

    @TableField("is_married")
    private Boolean isMarried;

    @TableField("`order`") // using escape character `` to avoid conflict with SQL keywords, like 'order' is a keyword of 'order by' sentence 
    private Integer order;
    
    @TableField(exist=false)
    private String address; // 'address' is not a field in database;

}
```

IdType一般常用的有以下几种类型：

- AUTO：数据库自增长(AUTO_INCREMENT)
- INPUT：通过SET方法自行输入
- ASSIGN_ID：分配ID，接口IdentifierGenerator的方法nextId来生成Id，默认实现类为DefaultIdentifierGenerator雪花算法

使用@TableField的常见场景：

- 成员变量名与数据库字段不一致
- 成员变量名以is开头，且为布尔值
- 成员变量名与数据库关键字冲突
- 成员变量不是数据库字段
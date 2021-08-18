<template>
  <div class="container">
    <div class="content">
      <div class="header_topic">
        <div class="topic_tit">
          <span class="put_top" v-if="this.topic.top">置顶</span>
          <span class="put_top" v-else-if="this.topic.good">精华</span>
          <span class="put_tit">{{ topic.title }}</span>
        </div>
        <div class="changes">
          <span>• 发布于{{ topic.create_at | timeFormat }}</span>
          <span>• 作者 {{ topic.author.loginname }}</span>
          <span>• {{ topic.visit_count }}次浏览</span>
          <span>• 来自 {{ topic | tabFormat }}</span>
          <button>收藏</button>
        </div>
      </div>
      <div class="section" v-html="topic.content">
        {{ topic.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { getTopicById } from "@/utils/api";

export default {
  data() {
    return {
      topic: {
        author: {},
      },
    };
  },
  methods: {
    fetchData(id) {
      getTopicById(id).then((res) => {
        this.topic = res.data.data;
      });
    },
  },
  filters: {
    timeFormat: (time) => {
      if(!time){
        return ''
      }
      let descTime = new Date().getTime() - new Date(time).getTime();
      if (descTime / 1000 < 30) {
        return "刚刚";
      } else if (descTime / 1000 < 60) {
        return parseInt(descTime / 1000) + "秒前";
      } else if (descTime / 60000 < 60) {
        return parseInt(descTime / 60000) + "分钟前";
      } else if (descTime / 3600000 < 24) {
        return parseInt(descTime / 3600000) + "小时前";
      } else if (descTime / 86400000 < 31) {
        return parseInt(descTime / 86400000) + "天前";
      } else if (descTime / 2592000000 < 12) {
        return parseInt(descTime / 2592000000) + "月前";
      } else {
        return parseInt(descTime / 31536000000) + "年前";
      }
    },
    tabFormat: (tab) => {
      switch (tab.tab) {
        case "share":
          return "分享";
        case "ask":
          return "问答";
        case "job":
          return "招聘";
      }
    },
  },
  created() {
    this.fetchData(this.$route.params.id);
  },
};
</script>

<style lang="less" scoped>
.btn {
  background-color: #80bd01;
  color: #fff;
  border-radius: 3px;
}
.content {
  .header_topic {
    padding:20px 10px;
    border-bottom: 1px solid rgb(224, 223, 223);
    .topic_tit {
      margin: 10px 0;
      .put_top {
        padding: 2px 4px;
        font-size: 12px;
        .btn;
      }
      .put_tit {
        margin-left: 10px;
        font-size: 22px;
        font-weight: 700;
      }
    }
    .changes {
      span {
        margin-right: 10px;
        font-size: 12px;
        color: #838383;
      }
      button{
        margin-left: 500px;
        border: none;
        padding: 8px 14px;
        cursor: pointer;
        .btn;
      }
    }
  }
  .section{
    padding: 10px;
    ul{
      list-style-type:disc ;
    }
  }
}
</style>
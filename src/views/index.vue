<template>
  <div class="container">
    <div class="content">
      <div class="header">
        <ul>
          <li
            :key="index"
            v-for="(tit, index) in menus"
            :class="{ active: activeIndex === index }"
            @click="changeMenu(index, tit.tab)"
          >
            <a href="" @click.prevent>{{ tit.name }}</a>
          </li>
        </ul>
      </div>
      <div class="inner">
        <ul>
          <li :key="index" v-for="(topic, index) in topics">
            <img
              :src="topic.author.avatar_url"
              alt=""
              :title="topic.author.loginname"
              style="height: 30px; width: 30px; cursor: pointer"
            />
            <span class="allcount">
              <span class="reply_count">{{ topic.reply_count }}/</span
              >{{ topic.visit_count }}
            </span>
            <span
              :class="[
                {
                  label: true,
                  label_green: topic.top || topic.good,
                  label_default: !(topic.top || topic.good),
                  label_null: !topic.tab,
                },
              ]"
            >
              {{ topic | formatTab }}
            </span>
            <router-link :to="`/topic/${topic.id}`">{{
              topic.title
            }}</router-link>
            <span class="reply_time">
              {{ topic.last_reply_at | formatReplyTime }}
            </span>
          </li>
        </ul>
      </div>
      <div class="pagination">
        <button @click="changeBtn" style="margin-right: -5px">A</button>
        <button v-if="judge" style="margin-right: -5px; pointer-events: none">
          ...
        </button>
        <button
          :key="index"
          v-for="(btn, index) in pageBtns"
          :class="[{ currentPage: btn === currentPage }, 'pageBtn']"
          @click="changeBtn(btn)"
        >
          {{ btn }}
        </button>
        <button @click="changeBtn" style="margin-left: -5px">>></button>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      topics: [],
      menus: [
        {
          id: 1,
          name: "全部",
          tab: "all",
        },
        {
          id: 2,
          name: "精华",
          tab: "good",
        },
        {
          id: 3,
          name: "分享",
          tab: "share",
        },
        {
          id: 4,
          name: "问答",
          tab: "ask",
        },
        {
          id: 5,
          name: "招聘",
          tab: "job",
        },
      ],
      activeIndex: 0,
      pageBtns: [1, 2, 3, 4, 5, "..."],
      currentPage: 1,
      judge: false,
    };
  },
  mounted() {
    this.getTopics(1, "all", 40);
  },
  methods: {
    changeMenu(index, tab) {
      this.activeIndex = index;
      this.getTopics(1, tab, 40);
    },
    getTopics(page, tab, limit) {
      this.$axios
        .get("https://cnodejs.org/api/v1/topics", {
          params: {
            page,
            tab,
            limit,
          },
        })
        .then((res) => {
          this.topics = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //改变页码
    changeBtn(page) {
      if (typeof page !== "number") {
        switch (page.target.innerText) {
          case ">>":
            this.pageBtns = [13, 14, 15];
            this.changeBtn(15);
            break;
          case "A":
            this.pageBtns = [1, 2, 3, 4, 5, "..."];
            this.changeBtn(1);
            break;
        }
        return;
      }
      this.currentPage = page;
      this.judge = page > 4;
      if (page === this.pageBtns[4]) {
        this.pageBtns.shift();
        this.pageBtns.splice(4, 0, this.pageBtns[3] + 1);
      } else if (page === this.pageBtns[0] && page !== 1) {
        this.pageBtns.unshift(this.pageBtns[0] - 1);
        this.pageBtns.splice(5, 1);
      }
      this.getTopics(page, this.menus[this.activeIndex].tab, 40);
    },
  },
  filters: {
    formatTab(topic) {
      const tabs = {
        share: "分享",
        ask: "问答",
        job: "招聘",
      };
      if (topic.top) {
        return "置顶";
      } else if (topic.good) {
        return "精华";
      } else {
        return tabs[topic.tab];
      }
    },
    formatReplyTime(time) {
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
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 10px;
  background-color: #f6f6f6;
  border-radius: 3px 3px 0 0;

  ul {
    height: 26px;

    li {
      float: left;
      width: auto;
      height: 20px;
      line-height: 20px;
      margin: 0 10px;
      padding: 3px 4px;
      border-radius: 3px;
      cursor: pointer;
      font-size: 14px;

      a {
        color: #80bd01;
      }
    }

    .active {
      background-color: #80bd01;

      a {
        color: #fff;
      }
    }
  }
}
.inner {
  li {
    height: 30px;
    padding: 10px;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
    img {
      float: left;
    }

    .allcount {
      float: left;
      width: 70px;
      font-size: 10px;
      color: #b4b4b4;
      text-align: center;

      .reply_count {
        color: #9e78c0;
        font-size: 14px;
      }
    }
    .label {
      display: inline-block;
      height: 20px;
      padding: 0 4px;
      margin: 0 10px;
      line-height: 20px;
      border-radius: 3px;
      font-size: 12px;
    }
    .label_green {
      background-color: #80bd01;
      color: #fff;
    }
    .label_default {
      color: #999;
      background-color: #e5e5e5;
    }
    .label_null {
      width: 24px;
      background-color: #fff;
    }
    a {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
    .reply_time {
      float: right;
      color: #778087;
      font-size: 12px;
    }
  }
}

.pagination {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

button {
  width: 35px;
  height: 35px;
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  padding: 0 2px;
  &:hover {
    background-color: #eee;
  }
}

.currentPage {
  color: #80bd01;
  pointer-events: none;
}
</style>

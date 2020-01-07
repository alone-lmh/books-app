import {
  list,
  bookDetails,
  readBook,
  getTipWord,
  getHotWord,
  search
} from "../servers/bookAPI";
import { Toast } from "antd-mobile";
import classify from "../../public/data/classify.json";
import { routerRedux } from "dva";

export default {
  namespace: "book",
  /* state表示数据，namespace表示组件名 pages表示总的小说个数  page表示当前在第几页，num表示当前在第几章,hotWord热搜词,tipWord搜索提示,flag用于判断是搜索还是分类*/
  state: {
    gender: "male",
    type: "1",
    major: "玄幻",
    hotWord: [],
    tipWord: [],
    classify: classify,
    list: [],
    page: 0,
    limit: 20,
    pages: 1,
    chapter: [],
    reading: "",
    id: "",
    flag: false,
    num: 1,
    book: ""
  },
  /* reducers表示我们如何，或者是以何种方式来改变数据 */
  /* reducers中接收的是同步的方法 */
  reducers: {
    add(state, action) {
      // console.log(state);
      // console.log(action);
      /* 将payload中的每一项取出来赋值给state */
      return { ...state, ...action.payload };
    }
  },
  /* 在dva中所有的异步操作都要放在effects中 */
  effects: {
    //加载小说列表
    *loadData(action, { put, call }) {
      //异步操作接收两个数据，第一个参数是我们传过来的数据，第二个参数里面有两个方法是我们会使用到的put 和 call
      //call 是原生js中的call 方法，表示调用一个异步请求接口，put表示派发一个action触发reducer中的操作（类似dispatch）
      //yield等待异步操作完成
      const result = yield call(
        list,
        action.payload.page,
        action.payload.gender,
        action.payload.type,
        action.payload.major,
        action.payload.limit
      );
      // console.log(result);
      //在同一个模型中的reducer调用可以不加命名空间
      yield put({
        type: "add",
        payload: {
          list: result.books,
          pages: result.total / action.payload.limit,
          page: action.payload.page,
          gender: action.payload.gender,
          type: action.payload.type,
          major: action.payload.major,
          flag: action.payload.flag,
          limit: action.payload.limit
        }
      });
      if (location.hash !== "#/") {
        yield put(routerRedux.push({ pathname: "/" }));
      }
      if (document.getElementById("books")) {
        yield (document.getElementById("books").scrollTop = 0);
      }
      yield Toast.hide();
    },
    //加载小说详情
    *loadDetails(action, { put, call }) {
      yield put({
        type: "add",
        payload: { id: action.payload.id, book: action.payload.book }
      });
      yield put(routerRedux.push({ pathname: "/bookDetails" }));
    },
    //加载章节列表
    *loadChapter(action, { put, call }) {
      const result = yield call(bookDetails, action.payload.id);
      // console.log(result);
      yield put({
        type: "add",
        payload: { chapter: result.chapters }
      });
      yield put(routerRedux.push({ pathname: "/chapters" }));
      yield Toast.hide();
    },
    //加载小说内容
    *read(action, { put, call }) {
      if (action.payload.url) {
        const result = yield call(readBook, action.payload.url);
        // console.log(result);
        yield put({
          type: "add",
          payload: { reading: result.chapter, num: action.payload.num }
        });
        yield (document.documentElement.scrollTop = 0);
        yield (document.body.scrollTop = 0);
        if (location.hash !== "#/readBook") {
          yield put(routerRedux.push({ pathname: "/readBook" }));
        }
        yield Toast.hide();
      }
    },
    //获取搜索提示
    *tipWord(action, { put, call }) {
      const result = yield call(getTipWord, action.payload.word);
      yield put({ type: "add", payload: { tipWord: result.keywords } });
    },
    //获取热搜词
    *hotWord(action, { put, call }) {
      const result = yield call(getHotWord);
      yield put({ type: "add", payload: { hotWord: result.books,flag:action.payload.flag } });
      yield put(routerRedux.push({ pathname: "/search" }));
    },
    // 获取搜索结果
    *search(action, { put, call }) {
      // console.log(action)
      const result = yield call(
        search,
        action.payload.word,
        action.payload.page,
        action.payload.limit
      );
      // console.log(result);
      yield put({
        type: "add",
        payload: {
          list: result.books,
          pages: result.total / action.payload.limit,
          major: action.payload.major,
          flag: action.payload.flag,
          page: action.payload.page,
          limit: action.payload.limit
        }
      });
      if (location.hash !== "#/") {
        yield put(routerRedux.push({ pathname: "/" }));
      }
      yield Toast.hide();
    }
  }
};

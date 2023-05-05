import dayjs from 'dayjs'

// 日期过滤器，转换日期格式
const date = {
    filters:{
        dateFormat(date,format){
            return dayjs(date).format(format)
        }
    }
}

export default date
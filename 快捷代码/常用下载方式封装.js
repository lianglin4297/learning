/*
 * @Descripttion: 
 * @version: 
 * @Author: Lianglin
 * @Date: 2020-03-11 15:16:21
 * @LastEditors: Lianglin
 * @LastEditTime: 2020-03-11 16:14:42
 */

let HOST_URL = ''
//form方式
export function downLoadFileByForm({
    data = {},
    url,
    ajaxMethod = 'POST'
}) {
    let action = HOST_URL + url
    const tempForm = document.createElement('form')
    tempForm.id = 'postDataForm'
    tempForm.name = 'postDataForm'
    // 添加到 body 中
    document.body.appendChild(tempForm)
    Object.keys(data).forEach(key => {
        // 设置相应参数
        let formItem = document.createElement('input')
        formItem.type = 'text'
        formItem.name = key
        formItem.value =
            typeof data[key] != 'object' ? data[key] : JSON.stringify(data[key])
        // 将该输入框插入到 form 中
        tempForm.appendChild(formItem)
    })
    // form 的提交方式
    tempForm.method = ajaxMethod
    // form 提交路径
    tempForm.action = action
    // 对该 form 执行提交
    tempForm.submit()
    // 删除该 form
    document.body.removeChild(tempForm)
}

// window.Open方式
export function downLoad(url) {
    if (url[0] != 'h') {
        url = HOST_URL + url
    }
    window.open(url)
}

//a标签方式
export function ajaxDownLoad({
    data = {},
    url,
    ajaxMethod = 'post'
}) {
    http[ajaxMethod](url, data, {
        responseType: 'blob'
    }).then(res => {
        let blob = new Blob([res], {
            type: res.type
        })
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        // downloadElement.download = fileName; //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放blob对象
    })
}
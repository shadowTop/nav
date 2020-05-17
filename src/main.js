const $siteList = $('.siteList')
const $addLi = $siteList.find('.addLi')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:'A',url:'//acfun.cn',showUrl:'acfun.cn'},
    {logo:'B',url:'//bilibili.com',showUrl:'bilibili.com'},
    {logo:'C',url:'//cctv.cn',showUrl:'cctv.cn'}
]
console.log(hashMap)
const simplifyUrl = (url)=>{
    return url.replace('https://','')
    .replace('http://','')
    .replace('www.','')
    .replace( /\/.*/,'')
}
const render =()=>{
    $siteList.find('li:not(.addLi)').remove()
    hashMap.forEach((node,index)=>{
        let showUrl = node.showUrl
        const $li =$(`<li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${showUrl}</div>
            <div class="close">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-close"></use>
            </svg>
            </div>
        </div>
        </li>
        `).insertBefore($addLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            console.log('hi')
            e.stopPropagation()//组织冒泡
            console.log(hashMap)
            hashMap.splice(index,1)
            render()
        })
    })
}
render()
$('.addButton').on('click',()=>{
    let url = window.prompt('请输入网址,如baidu.com')
     showUrl = simplifyUrl(url)
    if(url.indexOf('http')!==0){
        url = '//'+url
        console.log(url)
    } 
    hashMap.push({
        logo:showUrl[0],
        url:url,
        showUrl:showUrl
    })
    // console.log($siteList.find('li:not(.addLi)'))
    render()
})

window.onbeforeunload=()=>{
    // console.log('页面要关闭了')
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}

$(document).on('keypress',(e)=>{
    console.log(e.key)
    const {key} =e
    for(let i=0 ;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})
import React, {memo, useCallback, useMemo} from "react"
import AwesomeSwiper from 'react-awesome-swiper'
import Avatar from "@/components/Avatar"
import Image from "@/components/Image"
import ArticleItem from "@/components/ArctileIem"
import {useHistory} from "react-router"
import { IUser } from "@/store/user"
import {connect, useStore} from "react-redux"
import dayjs from "dayjs"
import Store from '@/store/store'

const config: any = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
    },

}
interface Proper extends IUser {

}

const Index = memo((props: Proper) => {
    const { username } = props
    const { push } = useHistory()
    const { getState } = useStore()
    const { user } = getState()
    const toProfile = useCallback(() => {
        if(!('id' in user)) {
            push('/login')
            return
        }
        push('/profile')
    },[user])
    const hold = useMemo(() => {
        return username || dayjs().format('YYYY-MM-DD')
    },[username])
    return <article className="home-index">
        <header className="header">
            <p className="phrase line-1">Hi,{  hold  }</p>
            <h1 className="lately-user">Lately user</h1>
            <span className="user" onClick={ toProfile }>
                <i className="icon iconfont iconuser" />
            </span>
        </header>
        <section className="lately-users">
            <ul className="users">
                <li className="item" onClick={() => {
                    push('/profile')
                }}>
                    <div className="user">
                        <Avatar src={''} radius={ '5vw' } iScale={ .85 } oScale={ .95 }/>
                    </div>
                    <p className="username">email</p>
                </li>
            </ul>
        </section>
        <section className="hots">
            <AwesomeSwiper config={config} className="your-classname">
                <div className="swiper-wrapper">
                    <div className="swiper-slide" onClick={ () => {
                        push('/story')
                    } }>
                        <div className="hot" >
                            <Image className="hot-card" src="https://ss1.bdstatic.com/70c1FuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3551370719,1936559374&fm=26&gp=0.jpg"/>
                            <p className="title">精彩故事，点击查看</p>
                        </div>
                    </div>

                    <div className="swiper-slide" onClick={ () => {
                        push('/story')
                    } }>
                        <div className="hot" >
                            <Image className="hot-card" src="https://ss1.bdstatic.com/70c1FuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3551370719,1936559374&fm=26&gp=0.jpg"/>
                            <p className="title">精彩故事，点击查看</p>
                        </div>
                    </div>
                </div>
            </AwesomeSwiper>
        </section>
        <section className="lately-articles">
            <div className="label">
                Latest News
            </div>
            <section className="articles">
                <div className="article" onClick={() => {
                    push('/article')
                }}>
                    <ArticleItem />
                </div>

                <div className="article">
                    <ArticleItem />
                </div>

                <div className="article">
                    <ArticleItem />
                </div>

            </section>

        </section>
    </article>
})
export default connect((state: any) => {
    return {
        ...state.user
    }
},dispatch => {
    return {

    }
})(Index)

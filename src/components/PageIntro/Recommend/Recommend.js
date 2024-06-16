import * as S from './style';
// import PageDataService from '../../../services/page.service';
// import {getPageById} from '../../../services/data.service';
import { PageService } from '../../../services/data';
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Item = ({ pageId, title, author, content, images}) => {
    const navigate = useNavigate();
    const handleItemTitleClick = (e) => {
        e.preventDefault();
        // console.log('click title');
        navigate(`/pages/@${author.name}/${pageId}`);
        // console.log('pageiD', pageId);
    };

    const handleItemAuthorClick = (e) => {
        e.preventDefault();
        // console.log('author')
        navigate(`/users/@${author.name}`);
    };

    // useEffect(() => {
    //     if(!content || content.length===0) {
    //         console.log('+++>>>>>');
    //     }
    // });

    return (
        <S.Item>
            <S.ItemTitle onClick={handleItemTitleClick}>{ title || ''}</S.ItemTitle>
            <S.ItemContent onClick={handleItemTitleClick}>{ content || ''}</S.ItemContent>
            {/* <S.ItemAuthor onClick = {handleItemAuthorClick}>{ `@${author.name}` || ''}</S.ItemAuthor> */}
            {/* 可能需要插入若干图片(至多3张?) */}
            <S.ItemImagesContainer>
                {images.map((image, index) => (
                    <div className='item-single-image-container' key={index}>
                        <img src={image} alt="image preview"></img>
                    </div>
                ))}
            </S.ItemImagesContainer>
            <S.ItemAuthorContainer>
                <div className='item-author-avatar-container'>
                    <img src={author.avatar}></img>
                </div>
                <span onClick = {handleItemAuthorClick}>{ `@${author.name}` || ''}</span>
            </S.ItemAuthorContainer>
        </S.Item>
    );
};

const Recommend = () => {
    const [recommendPages, setRecommendPages] = useState([]);
    useEffect(() => {
        const getRecommendedPosts = async () => {
            try {
                // const res = await PageDataService.getPageById(1);
                // const res = await PageService.getPageById(1);
                const res = await PageService.getRecommendedPages();
                setRecommendPages(res.data || []);
                console.log(res);
            } catch (err) {
                // console.log('_+++++++');
                console.log(err.message || 'Error occurred.');
            }
        };
        getRecommendedPosts();
    }, []);

    return (
        <S.StyledRecommend>
            <S.Header>
                <div><span>Recommended posts for you</span></div>
            </S.Header>
            <S.ItemsContainer>
                {recommendPages && recommendPages.map((page, index) => (
                    <Item key={index}
                          pageId={page.id}
                          title={page.title}
                          author={{name: page.author, avatar: page.avatar}}
                          content={page.content.slice(0,500)}
                          images={page.imageUrls}>
                        {/* {num} */}
                    </Item>
                ))}
            </S.ItemsContainer>
        </S.StyledRecommend>
    );
};

export default Recommend;
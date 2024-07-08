import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageService } from '../../../services/data';
import type { PageRecommendResData, PageResData } from 'types/page';
import * as S from './style';

interface ItemProps {
    pageId: PageRecommendResData['id'];
    title: PageRecommendResData['title'];
    author: {
        name: PageRecommendResData['author'];
        avatar: PageResData['avatar'];
    };
    content: string;
    images: PageRecommendResData['imageUrls'];
}

const Item: React.FC<ItemProps> = ({
    pageId,
    title,
    author,
    content,
    images,
}) => {
    const navigate = useNavigate();
    const handleItemTitleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate(`/pages/@${author.name}/${pageId}`);
    };

    const handleItemAuthorClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        navigate(`/users/@${author.name}`);
    };

    return (
        <S.Item>
            <S.ItemTitle onClick={handleItemTitleClick}>{title}</S.ItemTitle>
            <S.ItemContent onClick={handleItemTitleClick}>
                {content}
            </S.ItemContent>
            {/* 可能需要插入若干图片(至多3张?) */}
            <S.ItemImagesContainer>
                {images.map((image, index) => (
                    <div className="item-single-image-container" key={index}>
                        <img src={image} alt="image preview"></img>
                    </div>
                ))}
            </S.ItemImagesContainer>
            <S.ItemAuthorContainer>
                <div className="item-author-avatar-container">
                    <img src={author.avatar}></img>
                </div>
                <span onClick={handleItemAuthorClick}>
                    {`@${author.name}` || ''}
                </span>
            </S.ItemAuthorContainer>
        </S.Item>
    );
};

const Recommend = () => {
    const [recommendPages, setRecommendPages] = useState<
        PageRecommendResData[]
    >([]);
    useEffect(() => {
        const getRecommendedPosts = async () => {
            try {
                const data: PageRecommendResData[] =
                    await PageService.getRecommendedPages();
                setRecommendPages(data);
            } catch (err: any) {
                console.log(err.message || 'Error occurred.');
            }
        };
        getRecommendedPosts();
    }, []);

    return (
        <S.StyledRecommend>
            <S.Header>
                <div>
                    <span>Recommended posts for you</span>
                </div>
            </S.Header>
            <S.ItemsContainer>
                {recommendPages &&
                    recommendPages.map((page, index) => (
                        <Item
                            key={index}
                            pageId={page.id}
                            title={page.title}
                            author={{ name: page.author, avatar: page.avatar }}
                            content={page.content.slice(0, 500)}
                            images={page.imageUrls}
                        />
                    ))}
            </S.ItemsContainer>
        </S.StyledRecommend>
    );
};

export default Recommend;

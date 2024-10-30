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

interface RecommendProps {
    cols?: number;
}

const Recommend:React.FC<RecommendProps> = ({cols=2}) => {
    const [recommendPages, setRecommendPages] = useState<
        PageRecommendResData[][]
    >([]);
    const orderRecommendPages = (pages: PageRecommendResData[]) => {
        const pagesWithImgs = pages.filter((page, index) => {
            return page.imageUrls.length > 0;
        });
        const pagesWithoutImgs = pages.filter((page, index) => {
            return page.imageUrls.length == 0;
        });
        const groupedRecommendPages = new Array<PageRecommendResData[]>(cols);
        groupedRecommendPages.fill([]).forEach((_, index) => {
            groupedRecommendPages[index] = new Array<PageRecommendResData>;
        });
        // console.log(groupedRecommendPages);
        // console.log(pagesWithoutImgs);
        // console.log(pagesWithImgs);
        pagesWithoutImgs.reduce((acc, page, index) => {
            acc[index % cols].push(page);
            // console.log('index is ', index);
            // console.log('target idx is ', index % cols);
            return acc;
        }, groupedRecommendPages);
        // console.log('0', groupedRecommendPages[0].map((value, index)=>(value.id)));
        // console.log('1', groupedRecommendPages[1].map((value, index)=>(value.id)));
        pagesWithImgs.reduce((acc, page, index) => {
            acc[cols-1-index%cols].push(page);
            return acc;
        }, groupedRecommendPages);
        console.log(groupedRecommendPages);
        return groupedRecommendPages;
    };

    useEffect(() => {
        const getRecommendedPosts = async () => {
            try {
                const data: PageRecommendResData[] =
                    await PageService.getRecommendedPages();
                setRecommendPages(orderRecommendPages(data));
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
                    <span>Recommended for you</span>
                </div>
            </S.Header>
            <S.ItemsMultiColContainer>
                {recommendPages && recommendPages.map((pages, index) => (
                    <S.ItemSingleColContainer key={index}>
                        {pages && pages.map((page, index) => (
                            <Item
                                key={index}
                                pageId={page.id}
                                title={page.title}
                                author={{ name: page.author, avatar: page.avatar }}
                                content={page.content.slice(0, 500)}
                                images={page.imageUrls}
                            />
                        ))}
                    </S.ItemSingleColContainer>
                ))}
                {/* <S.ItemSingleColContainer>
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
                </S.ItemSingleColContainer> */}
            </S.ItemsMultiColContainer>
            {/* <S.ItemsContainer>
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
            </S.ItemsContainer> */}
        </S.StyledRecommend>
    );
};

export default Recommend;

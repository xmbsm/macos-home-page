import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import React from "react";

const projects = [
  {
    title: "小酷素材",
    desc: "专注海外商业设计精品素材，每日稳定更新10+款",
    img: "/images/sucai-cover.svg",
    tags: ["设计素材", "海外素材", "样机模板", "矢量插画", "笔刷", "图形图标", "平面图形", "网页模板"],
    liveUrl: "https://sucai.kusheji.com/",
    codeUrl: "#",
  },
  {
    title: "免费字体",
    desc: "免费可商用中文字体下载网站，无版权免费字体下载！",
    img: "/images/ziti-cover.svg",
    tags: ["免费字体", "可商用字体", "字体下载", "中文字体", "英文字体", "无版权字体"],
    liveUrl: "https://ziti.kusheji.com/",
    codeUrl: "#",
  },
  {
    title: "矢量LOGO下载",
    desc: "专注收录国内外矢量 LOGO，免费在线下载矢量 LOGO 素材，为设计师和开发者提供高质量的品牌标识资源。",
    img: "/images/logo-cover.svg",
    tags: ["logo下载", "标志下载"],
    liveUrl: "https://logo.kusheji.com/",
    codeUrl: "#",
  },
  {
    title: "配色网",
    desc: "配色网，在线图片识色，自动配色的颜色大全网站",
    img: "/images/ps-cover.svg",
    tags: ["图片识色", "在线配色", "配色工具"],
    liveUrl: "https://ps.shijuefuhao.com/",
    codeUrl: "#",
  },
  {
    title: "大师兄导航",
    desc: "综合实用型网址导航网站，让找网站更简单，持续更新优质网站链接。",
    img: "/images/dsxdh-cover.svg",
    tags: ["网址导航", "AI导航", "设计导航", "影视导航"],
    liveUrl: "https://dsxdh.com/",
    codeUrl: "#",
  },
];

const ProjectCard = ({ project }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div className="project-card" style={{
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      border: '1px solid rgba(0,0,0,0.06)',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: '200px',
        background: '#1a1a2e',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        {!imgError ? (
          <img
            src={project.img}
            alt={project.title}
            loading="lazy"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={() => setImgError(true)}
          />
        ) : null}
        {imgError && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)',
            color: 'white',
            gap: '12px',
          }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
              <polygon points="5 3 19 12 5 21 5 3" fill="rgba(255,255,255,0.2)" stroke="white" />
            </svg>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.5px' }}>{project.title}</span>
          </div>
        )}
      </div>

      <div style={{
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            margin: '0 0 12px',
            color: '#1a1a2e',
            lineHeight: 1.3,
          }}>
            {project.title}
          </h3>
          <p style={{
            fontSize: '0.95rem',
            color: '#6b7280',
            lineHeight: 1.7,
            margin: '0 0 20px',
          }}>
            {project.desc}
          </p>
          <div className="project-card-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                padding: '4px 14px',
                borderRadius: '20px',
                background: '#eef2ff',
                color: '#4338ca',
                fontSize: '0.78rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '8px', padding: '12px 20px', borderRadius: '12px', background: '#1a1a2e',
            color: '#fff', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none',
            cursor: 'pointer', border: 'none', transition: 'background 0.2s ease',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            立即前往
          </a>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  return (
    <>
      <div id="window-header" className="window-drag-handle">
        <WindowControls target="portfolio" />
        <h2 className="font-bold flex-1 text-center">项目</h2>
      </div>
      <div style={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '45px 36px 80px 36px',
        background: '#fff',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, margin: '0 0 14px', color: '#1a1a2e' }}>
            精选项目
          </h1>
          <p style={{
            fontSize: '1.05rem', color: '#6b7280', margin: 0, maxWidth: '640px',
            marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7,
          }}>
            展示我最近的工作成果，包括全栈应用、Web 开发项目和创新解决方案。
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

const PortfolioWindow = WindowWrapper(Portfolio, "portfolio");

export { Portfolio };
export default PortfolioWindow;

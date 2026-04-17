import { useState } from 'react';
import {
  Heart, MessageCircle, Share2, Clock, Dumbbell, Weight,
  TrendingUp, Trophy, Award, Send, Globe, Lock, ChevronDown,
  UserPlus, Flame,
} from 'lucide-react';
import Avatar from '../components/Avatar';
import { timeAgo } from '../utils/helpers';
import { mockUser, mockFeedPosts, mockCommunityUsers } from '../data/mockData';
import './Feed.css';

function PostComposer() {
  const [caption, setCaption] = useState('');
  const [shareMode, setShareMode] = useState('public');
  const [showOptions, setShowOptions] = useState(false);

  const handlePost = () => {
    if (!caption.trim()) return;
    // TODO: connect to backend
    setCaption('');
  };

  return (
    <div className="feed-composer">
      <div className="feed-composer-top">
        <Avatar name={mockUser.name} src={mockUser.profilePicture} size="sm" />
        <textarea
          className="feed-composer-input"
          placeholder="Share your workout or say something..."
          value={caption}
          onChange={e => setCaption(e.target.value)}
          rows={2}
        />
      </div>
      <div className="feed-composer-bottom">
        <div className="feed-composer-privacy">
          <button
            className="feed-privacy-btn"
            onClick={() => setShowOptions(!showOptions)}
          >
            {shareMode === 'public' ? <Globe size={13} /> : <Lock size={13} />}
            <span>{shareMode === 'public' ? 'Share workout' : 'Don\'t post'}</span>
            <ChevronDown size={12} />
          </button>
          {showOptions && (
            <div className="feed-privacy-dropdown">
              <button
                className={`feed-privacy-option ${shareMode === 'public' ? 'active' : ''}`}
                onClick={() => { setShareMode('public'); setShowOptions(false); }}
              >
                <Globe size={14} />
                <div>
                  <span className="feed-privacy-option-label">Share workout</span>
                  <span className="feed-privacy-option-desc">Visible to everyone</span>
                </div>
              </button>
              <button
                className={`feed-privacy-option ${shareMode === 'private' ? 'active' : ''}`}
                onClick={() => { setShareMode('private'); setShowOptions(false); }}
              >
                <Lock size={14} />
                <div>
                  <span className="feed-privacy-option-label">Don't post workout</span>
                  <span className="feed-privacy-option-desc">Log privately only</span>
                </div>
              </button>
            </div>
          )}
        </div>
        <button
          className={`feed-post-btn ${caption.trim() ? 'active' : ''}`}
          onClick={handlePost}
          disabled={!caption.trim()}
        >
          <Send size={14} />
          Post
        </button>
      </div>
    </div>
  );
}

function FeedPost({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="feed-post">
      {/* Post Header */}
      <div className="feed-post-header">
        <Avatar name={post.user.name} src={post.user.profilePicture} size="md" />
        <div className="feed-post-user">
          <span className="feed-post-name">{post.user.name}</span>
          <span className="feed-post-meta">
            @{post.user.username} · {timeAgo(post.timestamp)}
          </span>
        </div>
      </div>

      {/* Activity Tag */}
      <div className="feed-post-activity">
        {post.type === 'workout' && (
          <span className="feed-tag workout">
            <Dumbbell size={12} />
            Completed {post.workoutName}
          </span>
        )}
        {post.type === 'pr' && (
          <span className="feed-tag pr">
            <Trophy size={12} />
            New PR — {post.prExercise}: {post.prWeight} lbs × {post.prReps}
          </span>
        )}
        {post.type === 'milestone' && (
          <span className="feed-tag milestone">
            <Award size={12} />
            {post.milestoneType}
          </span>
        )}
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="feed-post-caption">{post.caption}</p>
      )}

      {/* Workout Summary Card */}
      {post.exercises && (
        <div className="feed-workout-card">
          <div className="feed-workout-exercises">
            {post.exercises.map((ex, i) => (
              <span key={i} className="feed-workout-ex">{ex}</span>
            ))}
          </div>
          <div className="feed-workout-stats">
            {post.duration && (
              <span><Clock size={12} /> {post.duration}m</span>
            )}
            {post.sets && (
              <span><TrendingUp size={12} /> {post.sets} sets</span>
            )}
            {post.volume > 0 && (
              <span><Weight size={12} /> {post.volume.toLocaleString()} lbs</span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="feed-post-actions">
        <button
          className={`feed-action-btn ${liked ? 'liked' : ''}`}
          onClick={toggleLike}
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          <span>{likeCount}</span>
        </button>
        <button className="feed-action-btn">
          <MessageCircle size={16} />
          <span>{post.comments}</span>
        </button>
        <button className="feed-action-btn">
          <Share2 size={16} />
        </button>
      </div>
    </div>
  );
}

function SuggestedUsers() {
  const [following, setFollowing] = useState({});
  const suggested = mockCommunityUsers.filter(u => !u.following).slice(0, 3);

  const toggleFollow = (userId) => {
    setFollowing(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  return (
    <div className="feed-suggested">
      <div className="feed-section-header">
        <h2>Suggested for You</h2>
      </div>
      <div className="feed-suggested-list">
        {suggested.map(user => (
          <div key={user.id} className="feed-suggested-card">
            <Avatar name={user.name} src={user.profilePicture} size="md" />
            <div className="feed-suggested-info">
              <span className="feed-suggested-name">{user.name}</span>
              <span className="feed-suggested-bio">{user.bio}</span>
              <span className="feed-suggested-stat">
                <Dumbbell size={10} /> {user.totalWorkouts} workouts
              </span>
            </div>
            <button
              className={`feed-follow-btn ${following[user.id] ? 'following' : ''}`}
              onClick={() => toggleFollow(user.id)}
            >
              {following[user.id] ? (
                'Following'
              ) : (
                <><UserPlus size={13} /> Follow</>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedUsers() {
  const featured = mockCommunityUsers.filter(u => u.totalWorkouts > 100).slice(0, 4);

  return (
    <div className="feed-featured">
      <div className="feed-section-header">
        <h2>Top Lifters</h2>
        <Flame size={16} className="feed-section-icon" />
      </div>
      <div className="feed-featured-scroll">
        {featured.map(user => (
          <div key={user.id} className="feed-featured-card">
            <Avatar name={user.name} src={user.profilePicture} size="md" />
            <span className="feed-featured-name">{user.name}</span>
            <span className="feed-featured-stat">{user.totalWorkouts} workouts</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Feed() {
  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Feed</h1>
        <p className="page-subtitle">See what your community is lifting</p>
      </div>

      <PostComposer />
      <FeaturedUsers />

      <div className="feed-section-header feed-activity-header">
        <h2>Recent Activity</h2>
      </div>

      <div className="feed-posts">
        {mockFeedPosts.slice(0, 3).map(post => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>

      <SuggestedUsers />

      <div className="feed-posts">
        {mockFeedPosts.slice(3).map(post => (
          <FeedPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

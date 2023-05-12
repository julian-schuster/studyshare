import React, { Component } from "react";
import { Link } from "react-router-dom";
const userId = 23;
export default class GroupListItem extends Component {
  render() {
    const {
      groupName,
      lastActivity,
      lastActive,
      ownerId,
      groupId,
    } = this.props;
    return (
      <div>
        <Link to={"/groups/group?id=" + groupId}>
          {groupName}: Last activity on{" "}
          {/* {lastActivity.getDate() +
            "." +
            lastActivity.getMonth() +
            "." +
            lastActivity.getFullYear()}{" "} */}
          {lastActivity}
          (by {lastActive})
        </Link>
        {userId === ownerId ? (
          <div>
            <button>Invite Members</button>
            <button>Delete Group</button>
          </div>
        ) : (
          <button>Leave Group</button>
        )}
      </div>
    );
  }
}

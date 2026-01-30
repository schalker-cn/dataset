import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TASK_MOCK from "../../../mocks/TASK_MOCK.json";

import { Media, CustomInput } from "./../../../components";

const TasksMedia = (props) => {
  const task = TASK_MOCK.tasks.find((t) => t.id === props.id);

  return (
    <React.Fragment>
      <Media>
        <Media left className="mr-3">
          <CustomInput
            className="pt-0 mt-0"
            type="checkbox"
            id={`taskMedia-${props.id}`}
            label=""
          />
        </Media>
        <Media body>
          <div className="mt-0 mb-2">
            <Link className="text-decoration-none">
              {task.title}
            </Link>
          </div>
          <div className="mb-0">
            {task.date}
          </div>
        </Media>
        <Media right className="ml-3">
          <i className={`fa fa-fw fa-circle text-${props.iconColor}`}></i>
        </Media>
      </Media>
    </React.Fragment>
  );
};

export { TasksMedia };

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Icon({
  name,
  color = "var(--icon-color)",
  size = "lg",
  ...props
}) {
  const iconName = {
    add: faAdd,
    edit: faEdit,
    delete: faTrashAlt,
  };

  const selectedIcon = iconName[name];

  return (
    <FontAwesomeIcon icon={selectedIcon} color={color} size={size} {...props} />
  );
}

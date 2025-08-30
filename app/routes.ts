import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/count", "routes/count.tsx"),
	route("/items", "routes/items.tsx"),
	route("/items/new", "routes/items.new.tsx"),
	route("/items/:id/edit", "routes/items.edit.tsx"),
] satisfies RouteConfig;

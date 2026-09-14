/**
 * Whether `pathname` is `route` or sits under it, matching whole segments only:
 * '/admin' covers '/admin/users' but not '/admin-panel'.
 *
 * The root entry needs no special case — it compares against '//', so '/'
 * matches itself and nothing else.
 */
export function isPrefixOf(route: string, pathname: string): boolean {
	return pathname === route || pathname.startsWith(`${route}/`);
}

import {Converter, ReflectionKind, Application, Reflection} from 'typedoc';

function convert(_: unknown, reflection: Reflection) {
	const {parent: mod} = reflection;

	if (mod && mod.kind === ReflectionKind.Module) {
		const
			{name} = reflection,
			{name: modPath} = mod;

		reflection.name = name === 'default'
			? modPath
			: `${modPath}:${name}`;
	}
}

export function load(app: Application) {
	app.converter.on(Converter.EVENT_CREATE_DECLARATION, convert);
}
class Feature {
  private translations: Map<string, string>;
  public emoji: string = '';
  public link: string = '';
  public presetIcon: string = '';

  private constructor() {
    this.translations = new Map();
    this.translations.set('zh-cn', '');
    this.translations.set('en', '');
  }

  public static createWithIcon(emoji: string): Feature {
    const feature = new Feature();
    feature.emoji = emoji;
    return feature;
  }

  public static createWithPresetIcon(presetIcon: string): Feature {
    const feature = new Feature();
    feature.presetIcon = presetIcon;
    return feature;
  }

  public setTitle(title: string, lang: string): Feature {
    this.translations.set(lang, title);
    return this;
  }

  public setLink(link: string): Feature {
    this.link = link;
    return this;
  }

  public setPresetIcon(presetIcon: string): Feature {
    this.presetIcon = presetIcon;
    return this;
  }

  public setZh(title: string): Feature {
    return this.setTitle(title, 'zh-cn');
  }

  public setEn(title: string): Feature {
    return this.setTitle(title, 'en');
  }

  public getTitle(lang: string): string {
    return this.translations.get(lang) || '';
  }
}

export default Feature;

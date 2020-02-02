app = {
  randomCouplesOfImgs: [],
  difficulty_table: {
    '4x4': 8,
    '6x6': 18,
    '8x8': 32,
    '10x10': 50,
    '20x20': 200,
  },
  gameSize: 0,
  currentlyOpenedCellPair: [],
  guessedPairsNumber: 0,
  currentTurn: 0,
  gameWon: 0,
  init: function() {
    const gameButtons = document.querySelectorAll(".game_button");
    gameButtons.forEach(function(element){
      element.addEventListener("click", app.startGame);
    });
  },
  startGame: function(buttonEvent) {
    app.gameWon = 0;
    app.gameSize = app.difficulty_table[buttonEvent.target.dataset.difficulty];
    app.createHTML();
    app.hideImgs();
    const imgCells = document.querySelectorAll(".game_image");
    imgCells.forEach(function(element){
      element.addEventListener("click", app.gameClick);
    });
  },
  shuffleImgArray: function(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  },
  resizeImgArray: function() {
    const newArraySize = app.gameSize;
    const newImgList = app.imgList.slice(0, newArraySize);
    return newImgList;
  },
  doubleAndShuffle: function() {
    app.shuffleImgArray(app.imgList);
    const newImgList = app.resizeImgArray();
    const doubleNewImgList = newImgList.concat(newImgList);
    app.shuffleImgArray(doubleNewImgList);
    return doubleNewImgList;
  },
  createHTML: function() {
    const imgList = app.doubleAndShuffle();
    const gameContainer = document.querySelector("#game_container");
    gameContainer.innerHTML = "";
    imgList.forEach(function(element){
      const imgDiv = document.createElement("div");
      imgDiv.classList.add("game_image");
      imgDiv.dataset.imgName = element;
      imgDiv.dataset.imgState = "closed";
      imgDiv.textContent = "?";
      gameContainer.appendChild(imgDiv);
    });
  },
  hideImgs: function() {
    if(app.currentlyOpenedCellPair.length == 2){
      const imgsToHide = document.querySelectorAll("[data-img-state='opened']");
      imgsToHide.forEach(function(element) {
        element.dataset.imgState = "closed";
        element.textContent = "?";
        element.style.backgroundImage = "";
        app.currentlyOpenedCellPair = [];
      });
    }
  },
  gameClick: function(event) {
    if (app.gameWon === 0){
      app.openImg(event);
    }
  },
  openImg: function(event) {
    app.hideImgs();
    const imgCell = event.target;
    if(imgCell.dataset.imgState == "closed"){
    const imgUrl = "./img/game_img/" + imgCell.dataset.imgName;
    imgCell.style.backgroundImage = "url(" + imgUrl + ")";
    imgCell.textContent = "";
    imgCell.dataset.imgState = "opened";
    app.currentlyOpenedCellPair[app.currentTurn%2] = imgCell;
    app.currentTurn++;
    }
    app.checkMatch();
    app.checkWin();
  },
  checkMatch: function() {
    if(app.currentlyOpenedCellPair.length == 2){
      if(app.currentlyOpenedCellPair[0].dataset.imgName == app.currentlyOpenedCellPair[1].dataset.imgName){
        app.currentlyOpenedCellPair[0].dataset.imgState = 'guessed';
        app.currentlyOpenedCellPair[1].dataset.imgState = 'guessed';
        app.currentlyOpenedCellPair = [];
      }
    }
  },
  checkWin: function() {
    const guessedPairs = document.querySelectorAll('[data-img-state="guessed"]');
    if(guessedPairs.length == app.gameSize * 2){
      app.addWinDiv();
    }
  },
  addWinDiv: function() {
    const winDiv = document.createElement("div");
    winDiv.id = "win";
    constWinText = "Gagné en " + app.currentTurn + " tours!";
    winDiv.innerText = constWinText;
    const winMessageContainer = document.querySelector("#win_message_container");
    winMessageContainer.appendChild(winDiv);
    app.gameWon = 1;
    },
  imgList: ['ancientautomaton.png', 'arcane_crystal.png', 'arcane_crystal_magic_circle.png', 'arcane_golem.png', 'arcane_orb_fire.png', 'arcane_orb_frost.png', 'arcane_orb_thunder.png', 'arcane_orb_wind.png', 'aspiring_knight_gladius.png', 'aspiring_knight_palazo.png', 'aspiring_knight_valterra.png', 'assasin_garland.png', 'assembling_automatons_automaton_a.png', 'assembling_automatons_automaton_b.png', 'assembling_automatons_automaton_c.png', 'assembling_automatons_automaton_d.png', 'blood_manipulation_feral.png', 'blood_manipulation_mage.png', 'blood_manipulation_slime.png', 'boss_abomination_aqua.png', 'boss_abomination_red.png', 'boss_alfadriel.png', 'boss_ancient_automaton.png', 'boss_ancient_priestess.png', 'boss_astral_lich.png', 'boss_big_fish.png', 'boss_black_ant_queen.png', 'boss_blood_feral.png', 'boss_bonemask_shadow_creature.png', 'boss_continental_turtle_rukkha.png', 'boss_crab_king_karkinos.png', 'boss_daidarabotchi.png', 'boss_darklord_excelsios.png', 'boss_darkness_titan_ilnoct.png', 'boss_dark_queen_shaccad_yoggoth.png', 'boss_doppelganger_slime.png', 'boss_dragon_emperor.png', 'boss_dragon_huanglong.png', 'boss_dryad_queen_rafflesia.png', 'boss_dryad_yggdrasil.png', 'boss_earth_dragon.png', "boss_eldritch_god_shaccad'yoggoth.png", 'boss_eldritch_slime_overmind.png', 'boss_feral_kitsune.png', 'boss_flynn_the_original_slime.png', 'boss_goddess_aphrodite.png', 'boss_goddess_innova.png', 'boss_god_jupiter.png', 'boss_god_novus.png', 'boss_god_warrior_dagon.png', 'boss_god_warrior_isis.png', 'boss_god_warrior_osiris.png', 'boss_god_warrior_poseidon.png', 'boss_god_warrior_skoll.png', 'boss_grand_sorceress_duessa.png', 'boss_hades.png', 'boss_hellhound_garm.png', 'boss_ice_titan_demeres.png', 'boss_insect_queen.png', 'boss_jubokko.png', 'boss_khronos.png', 'boss_legendary_knight_remment.png', 'boss_lich_king.png', 'boss_life_titan_aphylia.png', 'boss_light_titan_alfadriel.png', 'boss_living_hoard_midas.png', 'boss_mecha-dragon_ladon.png', 'boss_mecha-scorpion.png', 'boss_mecha_rattlesnake.png', 'boss_mythical_knight_goldnharl.png', 'boss_nature_titan_tellia.png', 'boss_nuckelavee.png', 'boss_orc_chief_grunt.png', 'boss_parrot_king.png', 'boss_radulac_the_voidvod.png', 'boss_reaper_nihilo.png', 'boss_runic_stone_golem_goliath.png', 'boss_sea_calamity_urmica.png', 'boss_sea_dragon_leviathan.png', 'boss_sea_mermaid_warrior_undeen.png', 'boss_skull_knight_xoer.png', 'boss_slime_golem.png', 'boss_son_of_valhalla.png', 'boss_spirit_fighter.png', 'boss_sun_goddess.png', 'boss_tantalus.png', 'boss_thanatos.png', 'boss_the_fallen.png', 'boss_the_horde.png', 'boss_the_originator.png', 'boss_thunder_titan_dynamo.png', 'boss_tiamat.png', 'boss_tiamat_unleashed.png', 'boss_twin_gods.png', 'boss_void_gargoyle_sabre.png', 'boss_wind_titan_ventoss.png', 'boss_zeograth.png', 'boss_zodiac_cancer.png', 'breakfast_nightmares_bacon_beast.png', 'breakfast_nightmares_bread_loaf.png', 'breakfast_nightmares_egg_slime.png', 'cave_dweller_blind_dragon.png', 'cave_dweller_rock_mimic.png', 'cave_dweller_worm.png', 'celestial_beatrix.png', 'cerberus_ptolemaios.png', 'clockwork_abomination.png', 'clockwork_aerial.png', 'clockwork_dragon.png', 'clockwork_dragon_juggernaut.png', 'clockwork_gigas.png', 'clockwork_iron_maiden.png', 'clockwork_juggernaut.png', 'clockwork_king.png', 'clockwork_knight_b.png', 'clockwork_knight_c.png', 'clockwork_knight_d.png', 'clockwork_mini_a.png', 'clockwork_mini_b.png', 'clockwork_mini_c.png', 'clockwork_prototype.png', 'clockwork_queen.png', 'clockwork_reaper.png', 'clockwork_skull.png', 'clockwork_slime.png', 'clockwork_spider.png', 'clockwork_spider_mini.png', 'colossal_bat.png', 'colossal_dark_crow.png', 'colossal_hydra_1.png', 'colossal_hydra_2.png', 'colossal_hydra_3.png', 'colossal_scorpion.png', 'colossal_snake.png', 'colossal_snake_black.png', 'colossal_snake_red.png', 'colossal_t-rex_black.png', 'colossal_t-rex_orange.png', 'colossal_t-rex_red.png', 'corrupted_fire_wolf.png', 'corrupted_ice_mantis.png', 'corrupted_ice_mantis_b.png', 'corrupted_stone_bear.png', 'corrupted_void_fire_wolf.png', 'crocodile_warriors_mage.png', 'crocodile_warriors_paladin.png', 'crocodile_warriors_rogue.png', 'crystal_golem.png', 'cybermancer.png', 'cyber_blader.png', 'cyber_hawk.png', 'cyber_ogre.png', 'cyber_pegasus.png', 'cyber_slime.png', 'darkness_angel.png', 'darkness_angel_reaper.png', 'darkness_banshee.png', 'darkness_behemoth.png', 'darkness_blade_colossus.png', 'darkness_blade_reaper.png', 'darkness_cultist_mage.png', 'darkness_devilimp.png', 'darkness_drakenvamp.png', 'darkness_dullahan.png', 'darkness_flame.png', 'darkness_gargoyle_atrox.png', 'darkness_hound_inferni.png', 'darkness_imp.png', 'darkness_knight_magellan.png', 'darkness_lord_knight.png', 'darkness_oculus.png', 'darkness_ogre.png', 'darkness_reaper.png', 'darkness_seeker.png', 'darkness_slime.png', 'darkness_slime_ghastmallow.png', 'darkness_succubus.png', 'darkness_succubus_lariatt.png', 'darkness_wisp.png', 'dark_elves_axe_warrior.png', 'dark_elves_crystal_mage.png', 'dark_elves_healer_priestess.png', 'desert_cactus_triple.png', 'desert_feral_cactus.png', 'desert_parasand.png', 'desert_rock_bunny.png', 'desert_rock_lizard.png', 'desert_sand_snake.png', 'desert_sand_tentacle.png', 'dragons_hydra.png', 'dragons_scarlet_wyrm.png', 'dragons_sea_dragon.png', 'dragon_black.png', 'dragon_dark_king.png', 'dragon_egg_a.png', 'dragon_egg_b.png', 'dragon_egg_c.png', 'dragon_egg_d.png', 'dragon_egg_e.png', 'dragon_emperor_zalaras.png', 'dragon_green.png', 'dragon_king_blue.png', 'dragon_king_brown.png', 'dragon_king_green.png', 'dragon_king_red.png', 'dragon_lord_a.png', 'dragon_lord_b.png', 'dragon_oriental_dragon.png', 'dragon_red.png', 'dragon_triple_head_darkness.png', 'dragon_triple_head_venom.png', 'dragon_white_king.png', 'dragon_wyrm.png', 'dragon_wyvern_blue.png', 'dragon_wyvern_brown.png', 'dragon_wyvern_green.png', 'dragon_wyvern_red.png', 'dryads_archer.png', 'dryads_mage.png', 'dryads_warrior.png', 'dwarf_axe_warrior.png', 'dwarf_dragon_slayer.png', 'dwarf_drill_knight.png', 'earth_bull.png', 'earth_bush_wisp.png', 'earth_gemstone_golem.png', 'earth_leaf_imp.png', 'earth_lion.png', 'earth_mandrake.png', 'earth_rock_golem.png', 'earth_snake.png', 'earth_spawn.png', 'earth_turtle.png', 'earth_wisp.png', 'egypt_archer.png', 'egypt_axe.png', 'egypt_chariot.png', 'egypt_cobra.png', 'egypt_crocodile.png', 'egypt_hieracosphinx.png', 'egypt_knight.png', 'egypt_mage.png', 'egypt_mummy_a.png', 'egypt_mummy_b.png', 'egypt_mummy_c.png', 'egypt_sphinx_small.png', 'eldritch_abominations_abyss_denizen.png', 'eldritch_abominations_scout.png', 'eldritch_abominations_ultimate.png', 'eldritch_abomination_gazer.png', 'eldritch_abomination_hound.png', 'eldritch_abomination_tyrant.png', 'eldritch_fire_slimei.png', 'eldritch_fire_slimeii.png', 'eldritch_fire_slimeiii.png', 'eldritch_gazer_merem.png', 'eldritch_gazer_velz.png', 'eldritch_god_shacadyoggoth.png', 'eldritch_ice_slimei.png', 'eldritch_ice_slimeii.png', 'eldritch_ice_slimeiii.png', 'eldritch_slime_a.png', 'eldritch_slime_b.png', 'eldritch_slime_cerulean.png', 'eldritch_slime_spawn_a.png', 'eldritch_slime_spawn_b.png', 'eldritch_slime_spawn_c.png', 'eldritch_slime_spawn_d.png', 'eldritch_slime_spawn_e.png', 'eldritch_slime_vermillion.png', 'eldritch_slime_viridian.png', 'elemental_earth_spirit_tellia.png', 'elemental_gemstone_earth.png', 'elemental_gemstone_fire.png', 'elemental_gemstone_thunder.png', 'elemental_gemstone_water.png', 'elemental_gemstone_wind.png', 'elemental_goddess_forest_flora.png', 'elemental_goddess_ice_yukia.png', 'elemental_goddess_wind_airi.png', 'elemental_ice_spirit_helida.png', 'elemental_spirit_fire_blazia.png', 'elemental_titan_aphylia.png', 'elemental_titan_aquos.png', 'elemental_titan_ignis.png', 'elemental_titan_tellia.png', 'elemental_titan_terran.png', 'elemental_titan_ventoss.png', 'elemental_wind_spirit_tempestia.png', 'elf_archer.png', 'elf_assasin.png', 'elf_knight_crossbow.png', 'elf_knight_dual.png', 'elf_knight_mage.png', 'elf_knight_spear.png', 'elf_knight_sword.png', 'elves_nature_linker.png', 'elves_rogue_elf.png', 'elves_spellcaster.png', 'fallen_dragon_knight.png', 'fallen_great_sword.png', 'fallen_winged_sword.png', 'fire_bull.png', 'fire_dragonspawn.png', 'fire_elemental_angel.png', 'fire_elemental_bat.png', 'fire_elemental__imp.png', 'fire_kindred_flame.png', 'fire_lava_spawn.png', 'fire_lava_worm.png', 'fire_lion.png', 'fire_minivolcano.png', 'fire_ogre.png', 'fire_pumice_rock.png', 'fire_pumice_sheep.png', 'fire_sabretooth.png', 'fire_salamander.png', 'fire_snake.png', 'fire_toad.png', 'fire_turtle.png', 'fire_volcanic_golem.png', 'fire_volcanic_maiden.png', 'fire_vulture.png', 'fire_wisp.png', 'flame_knight.png', 'forest_blue_flower.png', 'forest_catermoth.png', 'forest_darkluff.png', 'forest_deer.png', 'forest_fairy_dragon_xinbal.png', 'forest_fairy_filia.png', 'forest_fangrot.png', 'forest_golem.png', 'forest_grasshopper.png', 'forest_green_spider.png', 'forest_imperial_widow.png', 'forest_kawabun.png', 'forest_mobun.png', 'forest_mothy.png', 'forest_noxluff.png', 'forest_ogre_orkgre.png', 'forest_panda.png', 'forest_pink_flower.png', 'forest_red_flower.png', 'forest_red_spider.png', 'forest_shroom.png', 'forest_shroomy.png', 'forest_spider.png', 'forest_spora.png', 'forest_sprout.png', 'forest_tree.png', 'forest_uzu.png', 'forest_white_flower.png', 'gargoyle_grifos.png', 'garuda_garunix.png', 'gazers_eyewing.png', 'gazers_skull.png', 'gazers_tenteye.png', 'ghost_ghostus.png', 'ghost_knight_destrand.png', 'ghost_knight_galpha.png', 'ghost_knight_goliath.png', 'ghost_puppet_pailo.png', 'ghost_revelator.png', 'goblin_archer.png', 'goblin_elite.png', 'goblin_grunt.png', 'goblin_mage.png', 'goblin_raider.png', 'goddess_innova.png', 'god_novus.png', 'gunblin_gibson.png', 'gunblin_jackson.png', 'gunblin_schecter.png', 'halloween_bat.png', 'halloween_black_cat.png', 'halloween_dagger_skeleton.png', 'halloween_lick_o_wisp.png', 'halloween_pumpkin.png', 'halloween_pumpkin_chariot.png', 'halloween_pumpkin_chariot_minion_a.png', 'halloween_pumpkin_chariot_minion_b.png', 'halloween_pumpkin_chariot_no_minion.png', 'halloween_pumpkin_gentleman.png', 'halloween_skeleton.png', 'halloween_spirit_mumpkin.png', 
"halloween_steins_monster_mk2.png", 'halloween_stein_monster.png', 'halloween_vampire.png', 'halloween_witch.png', 'halloween_witch_baba.png', 'ice_avian.png', 'ice_bull.png', 'ice_cave_bat.png', 'ice_glacier_spawn.png', 'ice_golem.png', 'ice_kindred_glacier.png', 'ice_lion.png', 'ice_ogre.png', 'ice_snake.png', 'ice_snobros.png', 'ice_snowball.png', 'ice_snowman.png', 'ice_spike.png', 'ice_turtle.png', 'ice_whisp.png', 'ice_yeti.png', 'ice_yeti_whisp.png', 'insects_ant_lion.png', 'insects_bee.png', 'insects_black_ant_archer.png', 'insects_black_ant_berserker.png', 'insects_black_ant_knight.png', 'insects_black_ant_mage.png', 'insects_black_ant_protector.png', 'insects_caterpillar_a.png', 'insects_caterpillar_b.png', 'insects_dragon.png', 'insects_dragonfly.png', 'insects_dragonfly_b.png', 'insects_eyehopper.png', 'insects_fire_ant.png', 'insects_giant_bug_centipede.png', 'insects_giant_bug_death_worm_a.png', 'insects_giant_bug_death_worm_b.png', 'insects_giant_bug_hercules.png', 'insects_hell_mantis.png', 'insects_lunar_butterfly.png', 'insects_roach.png', 'insects_scarab.png', 'insects_sickle_mantis.png', 'insects_swarm.png', 'insects_tick.png', 'insects_tridentpupa.png', 'insects_waterstrider.png', 'insect_red_ant_knight.png', 'knights_spear_common.png', 'knights_sword_common.png', 'knight_axe_common.png', 'knight_axe_elite.png', 'knight_blunderbuss_common.png', 'knight_blunderbuss_elite.png', 'knight_spear_elite.png', 'knight_sword_elite.png', 'kobolds_dagger_kobold.png', 'kobolds_mage_kobold.png', 'kobolds_spear_kobold.png', 'lamia.png', 'legendary_knights_blacksmith_remment.png', 'legendary_knights_dancer_zidh.png', 'legendary_knights_disciple_chain.png', 'legendary_knights_disciple_moonblade.png', 'legendary_knights_disciple_pike.png', 'legendary_knights_huntress_arriette.png', 'legendary_knights_minion_axe.png', 'legendary_knights_minion_claymore.png', 'legendary_knights_minion_spear.png', 'legendary_knights_nobleman_ansellus.png', 'legendary_knights_scholar_jeanne.png', 'legendary_knights_summoner_dante_a.png', 'legendary_knights_summoner_dante_b.png', 'legendary_knight_ansellus.png', 'legendary_knight_arriete.png', 'legendary_knight_arriette_f.png', 'legendary_knight_croix.png', 'legendary_knight_dalton.png', 'legendary_knight_dante.png', 'legendary_knight_jeanne.png', 'legendary_knight_king_archial.png', 'legendary_knight_michael.png', 'legendary_knight_pizarro.png', 'legendary_knight_pizarro_b.png', 'legendary_knight_regulus.png', 'legendary_knight_remment.png', 'legendary_knight_sen.png', 'legendary_knight_serat.png', 'legendary_knight_zidh.png', 'legendary_knight_zidh_b.png', 'library_book_golem.png', 'library_book_master.png', 'library_book_swarm.png', 'library_book_swarm_b.png', 'light_angel_heavy_knight.png', 'light_angel_knight.png', 'light_angel_maiden.png', 'light_creatures_throne.png', 'light_dragon.png', 'light_gemstone_a.png', 'light_gemstone_b.png', 'light_gemstone_c.png', 'light_holy_orb.png', 'light_scholar_angel.png', 'light_slime.png', 'light_snake.png', 'light_summoned_angel.png', 'light_wisp.png', 'light_wolf.png', 'machines_airship.png', 'machines_cannon.png', 'machines_fantasy_tank_a.png', 'machines_fantasy_tank_b.png', 'machines_fantasy_tank_c.png', 'machines_fantasy_tank_d.png', 'machines_zeppellin.png', 'mage_garrintan.png', 'medieval_bandit_child.png', 'medieval_bandit_dagger_gun.png', 'medieval_bandit_great_sword.png', 'megapack_iii_axe_warrior_dwarf.png', 'megapack_iii_behemoth.png', 'megapack_iii_black_iron_minotaur_beef.png', 'megapack_iii_cerberus_ptolemaios.png', 'megapack_iii_dragonslayer_dwarf.png', 'megapack_iii_elemental_lords_fire_lord.png', 'megapack_iii_elemental_lords_ice_maiden.png', 'megapack_iii_fallen_kings_arcane_king_jeffroy.png', 'megapack_iii_fallen_kings_king_of_dwarves_skor.png', 'megapack_iii_fallen_kings_king_of_elves_dreyel.png', 'megapack_iii_fallen_kings_king_of_giants_goken.png', 'megapack_iii_hellhound_inferni.png', 'megapack_iii_red_guard_a.png', 'megapack_iii_red_guard_b.png', 'megapack_iii_red_guard_c.png', 'megapack_iii_undead_warrior_benkei.png', 'megapack_iii_void_gargoyle.png', 'megapack_iii_zodiac_aries.png', 'megapack_ii_avian_a.png', 'megapack_ii_avian_elephant.png', 'megapack_ii_betafish.png', 'megapack_ii_biofish.png', 'megapack_ii_black_lance_knight.png', 'megapack_ii_blue_seeker.png', 'megapack_ii_bug_originator.png', 'megapack_ii_colossal_mummy.png', 'megapack_ii_crocoknight.png', 'megapack_ii_diamond_dog.png', 'megapack_ii_dryad_mini.png', 'megapack_ii_electroctopus.png', 'megapack_ii_feathered_snake.png', 'megapack_ii_flame_monkey.png', 'megapack_ii_forest_six-wing_fairy.png', 'megapack_ii_frost_gorilla.png', 'megapack_ii_hornet_warrior.png', 'megapack_ii_horn_willow.png', 'megapack_ii_mountain_razortail_eagle.png', 'megapack_ii_red_shroom_a.png', 'megapack_ii_red_shroom_b.png', 'megapack_ii_roaming_salamander.png', 'megapack_ii_rocktail_demolisher.png', 'megapack_ii_samurai_skeleton.png', 'megapack_ii_shadow_knight.png', 'megapack_ii_silver_avian.png', 'megapack_ii_spiked_caterpillar.png', 'megapack_ii_spike_hopper.png', 'megapack_ii_toucan_panther.png', 'megapack_ii_void_demon_b.png', 'megapack_ii_white_minotaur.png', 'megapack_ii_wingless_dragon.png', 'megpack_iii_drill_dwarf.png', 'megpack_iii_fallen_kings_undead_king_berthelot.png', 'mimic.png', 'mimic_armor.png', 'mimic_barrel.png', 'mimic_book.png', 'mimic_bow.png', 'mimic_bush.png', 'mimic_chest.png', 'mimic_cloak.png', 'mimic_crystal.png', 'mimic_door.png', 'mimic_humanoid.png', 'mimic_jar.png', 'mimic_paper_plane.png', 'mimic_potion.png', 'mimic_sarcophagus.png', 'mimic_shield.png', 'mimic_slime.png', 'mimic_sword.png', 'minotaur_beef.png', 'minotaur_bloodshotbeef.png', 'mirror_mimic.png', 'mountainscarbear.png', 'mountain_bat.png', 'mountain_black_wolf.png', 'mountain_bull_dragon.png', 'mountain_bunny.png', 'mountain_chimera.png', 'mountain_dodo.png', 'mountain_fetero.png', 'mountain_goat.png', 'mountain_greathorn_goat.png', 'mountain_griffon.png', 'mountain_harpy.png', 'mountain_hornette.png', 'mountain_nanjo.png', 'mountain_owl.png', 'mountain_peacock.png', 'mountain_rock_mimic.png', 'mountain_scorpion_scopus.png', 'mountain_serpens.png', 'mountain_snail.png', 'mountain_warthog.png', 'mountain_werebear_martz.png', 'mountain_winter_wolf.png', 'mountain_wolf.png', 'moutain_behemoth.png', 'mushroom_don.png', 'mushroom_shroomslinger.png', 'objects_ace_club.png', 'objects_ace_diamond.png', 'objects_ace_heart.png', 'objects_ace_spade.png', 'objects_assault_station.png', 'objects_bbishop.png', 'objects_bhorse.png', 'objects_bking.png', 'objects_bpawna.png', 'objects_bpawnb.png', 'objects_bqueen.png', 'objects_btower.png', 'objects_dorian.png', 'objects_driller.png', 'objects_madpill.png', 'objects_madsule.png', 'objects_mainframe.png', 'objects_medibros.png', 'objects_twin_handheld.png', 'objects_wbishop.png', 'objects_whorse.png', 'objects_wking.png', 'objects_wpawna.png', 'objects_wpawnb.png', 'objects_wqueen.png', 'objects_wtower.png', 'objects_ybox.png', 'orc_archer.png', 'orc_archer_weak.png', 'orc_axe_warrior.png', 'orc_axe_warrior_w.png', 'orc_axe_warrior_weak.png', 'orc_sword_warrior.png', 'orc_sword_warrior_weak.png', 'orc_warlock.png', 'orc_warlock_weak.png', 'orc_war_drummer.png', 'orc_war_drummer_weak.png', 'pirate_bandit.png', 'pirate_captain.png', 'pirate_magic_scimitar.png', 'pirate_monkey.png', 'pirate_parrot.png', 'pirate_skeleton.png', 'plant_warriors_cape_sundew.png', 'plant_warriors_rose_knight.png', 'plant_warriors_screamer_mandrake.png', 'possessed_knights_axe.png', 'possessed_knights_gun.png', 'possessed_knights_saber.png', 'post-modern_machinery_assault.png', 'post-modern_machinery_heavy.png', 'post-modern_machinery_scout.png', 'post-modern_soldier_a.png', 'post-modern_soldier_b.png', 'post-modern_soldier_c.png', 'pre-legendary_knights_cursed_swordsman_michael.png', 'pre-legendary_knights_inventor_sen.png', 'pre-legendary_knights_onna-bugeisha_croix.png', 'rabbit_warriors_archer.png', 'rabbit_warriors_bandit.png', 'rabbit_warriors_knight.png', 'robot_dracozord.png', 'rock_golem.png', 'rogue_bastard_sword.png', 'rogue_dagger_monk.png', 'rogue_twin_dagger.png', 'sea_abismos.png', 'sea_arman.png', 'sea_armes.png', 'sea_armon.png', 'sea_beach_dark_shell.png', 'sea_beach_dark_star.png', 'sea_beach_emperor_crab_a.png', 'sea_beach_emperor_crab_b.png', 'sea_beach_hermit_crab.png', 'sea_beach_pelican.png', 'sea_beach_seagull.png', 'sea_beach_shell_claw_a.png', 'sea_beach_shell_claw_b.png', 'sea_beach_spider_crab_a.png', 'sea_beach_spider_crab_b.png', 'sea_beach_spikestar_.png', 'sea_beach_spore.png', 'sea_beach_stars.png', 'sea_beach_star_shell.png', 'sea_beach_turtle.png', 'sea_beach_turtle_golem.png', 'sea_beach_urchin.png', 'sea_beach_war_lobster_a.png', 'sea_beach_war_lobster_b.png', 'sea_blue_dragon.png', 'sea_crab.png', 'sea_fatoad.png', 'sea_fish_a.png', 'sea_fish_b.png', 'sea_fish_c.png', 'sea_horntle.png', 'sea_horse.png', 'sea_jellyfish.png', 'sea_lickitoad.png', 'sea_lurker.png', 'sea_mermaid.png', 'sea_mermaid_warrior_arliette.png', 'sea_mermaid_warrior_sasha.png', 'sea_mermaid_warrior_sion.png', 'sea_octi.png', 'sea_octopus.png', 'sea_piranos.png', 'sea_seaweed_cannon.png', 'sea_shark.png', 'sea_shelltacke.png', 'sea_spheria.png', 'sea_tortoad.png', 'sea_turtle.png', 'sea_vamphibian.png', 'secondary_elementals_acid_elemental.png', 'secondary_elementals_time_elemental.png', 'secondary_elementals_war_elemental.png', 'seven_sins_gluttony.png', 'seven_sins_greed.png', 'seven_sins_lust.png', 'seven_sins_pride.png', 'seven_sins_sloth.png', 'seven_sins_wrath.png', 'skeleton_archer.png', 'skeleton_archer_sisbon.png', 'skeleton_dragon.png', 'skeleton_hare.png', 'skeleton_knight_alstreim.png', 'skeleton_knight_baron.png', 'skeleton_knight_debon.png', 'skeleton_knight_debons.png', 'skeleton_mage.png', 'skeleton_mage_mabon.png', 'skull_knight_xoer.png', 'slimei.png', 'slimeii.png', 'slimeiii.png', 'slime_blue.png', 'slime_darki.png', 'slime_darkii.png', 'slime_darkiii.png', 'slime_earthi.png', 'slime_earthii.png', 'slime_earthiii.png', 'slime_firei.png', 'slime_fireii.png', 'slime_fireiii.png', 'slime_holyi.png', 'slime_holyii.png', 'slime_holyiii.png', 'slime_icei.png', 'slime_iceii.png', 'slime_iceiii.png', 'slime_rpg_attacker.png', 'slime_rpg_basic.png', 'slime_rpg_buffer.png', 'slime_rpg_caster.png', 'slime_rpg_debuffer.png', 'slime_rpg_defender.png', 'slime_rpg_healer.png', 'slime_rpg_king.png', 'slime_thunderi.png', 'slime_thunderii.png', 'slime_thunderiii.png', 'slime_wateri.png', 'slime_waterii.png', 'slime_wateriii.png', 'slime_windi.png', 'slime_windii.png', 'slime_windiii.png', 'special_spiders_dragon_spider.png', 'special_spiders_fire_spider.png', 'special_spiders_ghost_spider.png', 'summon_alicorn.png', 'summon_carbuncle.png', 'summon_ifrit.png', 'summon_odin.png', 'summon_shiva.png', 'titans_thunder_dynamo.png', 'titan_alfadriel.png', 'titan_aquos.png', 'titan_darkness_ilnoct.png', 'titan_earth_terran.png', 'titan_fire_ignis.png', 'titan_ice_demeres.png', 'titan_wind_ventoss.png', 'toxic_cactus_a.png', 'toxic_cactus_b.png', 'toxic_cactus_c.png', 'toxic_carnivorous_plant_a.png', 'toxic_carnivorous_plant_b.png', 'toxic_carnivorous_plant_c.png', 'toxic_frog_a.png', 'toxic_frog_a2.png', 'toxic_frog_b.png', 'toxic_frog_b2.png', 'toxic_frog_c.png', 'toxic_frog_c2.png', 'toxic_maneater_plant_b.png', 'toxic_maneater_plant_c.png', 'toxic_maneater_plan_a.png', 'toxic_root_a.png', 'toxic_root_b.png', 'toxic_shroom_a.png', 'toxic_shroom_b.png', 'toxic_shroom_c.png', 'tribal_elves_bastard_sword.png', 'tribal_elves_dagger.png', 'tribal_elves_rapier.png', 'undead_benkei.png', 'undead_claw_knight.png', 'undead_gigaraven.png', 'undead_jiangshi.png', 'undead_skull_slime.png', 'undead_skull_tree.png', 'undead_slime.png', 'undead_walker.png', 'undead_wolf.png', 'vampiric_creatures_flying_leech.png', 'vampiric_creatures_giant_mosquito.png', 'vampiric_creature_dragon_lamprey.png', 'voidoll_erabos.png', 'voidoll_erebia.png', 'voidoll_erebus.png', 'weretiger_maxima.png', 'werewolf_rigel.png', 'whisp_wispia.png', 'wind_avian.png', 'wind_bunny.png', 'wind_fairy.png', 'wind_feathered_golem.png', 'wind_feathered_razor.png', 'wind_harpy.png', 'wind_lion.png', 'wind_mantis.png', 'wind_snake.png', 'wind_spawn.png', 'wind_wisp.png', 'witch_hunters_healer.png', 'witch_hunters_leader.png', 'witch_hunters_noble.png', 'xmas_bear.png', 'xmas_cookie.png', 'xmas_penguin.png', 'xmas_snowman.png', 'xmas_tree.png', 'zodiac_aquarius.png', 'zodiac_aquarius_b.png', 'zodiac_aries.png', 'zodiac_aries_b.png', 'zodiac_capricorn.png', 'zodiac_creatures_cancer.png', 'zodiac_creatures_libra.png', 'zodiac_creatures_ophichus.png', 'zodiac_creatures_pisces.png', 'zodiac_creatures_saggitarius.png', 'zodiac_creatures_scorpion.png', 'zodiac_gemini.png', 'zodiac_leo.png', 'zodiac_taurus.png', 'zodiac_virgo.png'],
}

document.addEventListener("DOMContentLoaded", app.init);
/*

var images = [];
var eight_randomCouplesOfImgs = [];
var all_cells = document.getElementsByClassName("game_cell_image");
var image_per_cell_dictionary = {};
var current_turn = 1;
var current_cell_pair = [];
var guessed_cells = [];
var number_of_guessed_cells = 0;
var game_won = "nope";

function clear_board() {
  
  current_turn = 1;
  current_cell_pair = [];
  guessed_cells = [];
  number_of_guessed_cells = 0;
  game_won = "nope";
  get_eight_randomCouplesOfImgs();
  get_image_per_cell_dictionary();
  display_game_won();
  for (var i = 0; i < all_cells.length; i++) {
    all_cells[i].src = "./game_images//empty_cell.png";
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // swap elements
  }
}

function delete_images_after_eight() {
  while (images.length > 8) {
    images.pop();
  }
}

function get_eight_randomCouplesOfImgs() {
  shuffle(images);
  delete_images_after_eight();
  var eight_couples_of_images = images.concat(images);
  shuffle(eight_couples_of_images);
  eight_randomCouplesOfImgs = eight_couples_of_images;
}

function get_image_per_cell_dictionary() {
  for (var i = 0; i < all_cells.length; i++) {
    image_per_cell_dictionary[all_cells[i].id] =
      eight_randomCouplesOfImgs[i];
  }
}

var restart_game = document.querySelector("#restart_button");

restart_game.addEventListener("click", clear_board);

function check_winning_conditions() {
  if (number_of_guessed_cells == 16) {
    game_won = "yes";
    display_game_won();
  }
}

function close_not_matching_cells() {
  if (current_turn > 2) {
    if (!guessed_cells.includes(current_cell_pair[0])) {
      current_cell_pair[0].src = "./game_images//empty_cell.png";
      current_cell_pair[1].src = "./game_images//empty_cell.png";
    }
  }
}

function check_for_match() {
  if (current_cell_pair[0].src == current_cell_pair[1].src) {
    guessed_cells.push(current_cell_pair[0]);
    guessed_cells.push(current_cell_pair[1]);
    number_of_guessed_cells = number_of_guessed_cells + 2;
    check_winning_conditions();
  }
}

function cell_clicked() {
  if (this.src.includes("/game_images//empty_cell.png")) {
    if (current_turn % 2 == 1) {
      close_not_matching_cells();
      current_cell_pair[(current_turn - 1) % 2] = this;
      current_cell_pair[(current_turn - 1) % 2].src =
        image_per_cell_dictionary[this.id];
    } else {
      current_cell_pair[(current_turn - 1) % 2] = this;
      current_cell_pair[(current_turn - 1) % 2].src =
        image_per_cell_dictionary[this.id];
      check_for_match();
    }

    current_turn++;
  }
}

function display_game_won() {
  if (game_won == "yes") {
    document.getElementById("game_won").style.display = "block";
    document.getElementById("number_of_turns").innerHTML = current_turn;
  } else {
    document.getElementById("game_won").style.display = "none";
  }
}

for (var i = 0; i < all_cells.length; i++) {
  all_cells[i].addEventListener("click", cell_clicked);
}

*/